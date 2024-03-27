import { GetStaticProps } from 'next'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import Head from 'next/head'
import Image from 'next/image'



import { FiChevronLeft, FiChevronRight, FiChevronsRight, FiChevronsLeft } from 'react-icons/fi'
import { getPrismicClient } from '../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { FaArrowUp } from 'react-icons/fa'

type Post = {
    slug: string
    title: string
    description: string;
    cover: string;
    updatedAt: string;
}

interface PostsProps {
    posts: Post[];
    page: string;
    totalPage: string;
}


export default function Posts({ posts: postsBlog, page, totalPage }: PostsProps) {
    const [posts, setPosts] = useState(postsBlog || [])
    const [currentPate, setCurrentPage] = useState(Number(page))
    const [showButton, setShowButton] = useState(false)


    const checkScroll = () => {
        if (window.scrollY > window.innerHeight / 1) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', checkScroll)
        return () => {
            window.removeEventListener('scroll', checkScroll)
        }
    }, [])

    

    async function reqPost(pageNumber: number) {
        const prismic = getPrismicClient()
        const response = await prismic.query([
            Prismic.Predicates.at('document.type', 'post')
        ], {
            orderings: '[document.last_publication_date desc]', //ordernar pelo mais recente.
            fetch: ['post.title', 'post.description', 'post.cover'],
            pageSize: 3,
            page: String(pageNumber)
        })

        return response
    }

    async function navigatePage(pageNumber: number) {
        const response = await reqPost(pageNumber)
        if (response.results.length === 0) {
            return
        }
        const getPosts = response.results.map((post: any) => {
            return {
                slug: post.uid,
                title: RichText.asText(post.data.title),
                description: post.data.description.find((content: any) => content.type === 'paragraph')?.text ?? '',
                cover: post.data.cover.url,
                updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })

            }
        })
        setCurrentPage(pageNumber)
        setPosts(getPosts)
    }

    return (
        <>
            <Head>
                <title>Portfólio | Projetos</title>
            </Head>
           


            <main className={styles.container}>
              <article className={styles.article}>
                <h1><Link target='_blank' href={'https://www.linkedin.com/in/tiagotrsm/'}>Tiago Machado</Link></h1>
                <h2>Desenvolvedor FullStack</h2>
                <hr />
                <br />
                <h2>
                  Aplicações Web com as tecnologias mais utilizadas.
                </h2>
                <br></br>
                <span>
                  * Estas aplicações foram feitas com React no front End, e Node.js no Back end,
                  Uma delas foi feita como exigência de uma Vaga de emprego, e a outra eu idealizei, e fiz totalmente do zero, seguindo a documentação.
                </span>
              </article>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                            <Image src={post.cover}
                                alt={post.title}
                                width={720}
                                height={410}
                                quality={100}
                                draggable={false}
                                placeholder='blur'
                                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUF5d8BQABxwEz747jfgAAAABJRU5ErkJggg=='

                            />
                            <strong>{post.title}</strong>
                            <time>{post.updatedAt}</time>
                            <p>{post.description}</p>
                        </Link>
                    ))}

                    <div className={styles.buttonNavigate}>
                        {Number(currentPate) >= 2 && (
                            <div>
                                <button onClick={() => navigatePage(1)}>
                                    <FiChevronsLeft size={25} color="#FFF" />
                                </button>
                                <button onClick={() => navigatePage(Number(currentPate - 1))}>
                                    <FiChevronLeft size={25} color="#FFF" />
                                </button>
                            </div>
                        )}

                        {Number(currentPate) < Number(totalPage) && (
                            <div>
                                <button onClick={() => navigatePage(Number(currentPate + 1))}>
                                    <FiChevronRight size={25} color="#FFF" />
                                </button>
                                <button onClick={() => navigatePage(Number(totalPage))}>
                                    <FiChevronsRight size={25} color="#FFF" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {showButton && (
                    <a className={styles.btntopo} href='#topo'>
                        <FaArrowUp color={'#FFF'}
                            size={25}
                        />

                    </a>
                )}
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()
    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'post')
    ], {
        orderings: '[document.last_publication_date desc]', //ordernar pelo mais recente.
        fetch: ['post.title', 'post.description', 'post.cover'],
        pageSize: 3
    })

    const posts = response.results.map((post: any) => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            description: post.data.description.find((content: any) => content.type === 'paragraph')?.text ?? '',
            cover: post.data.cover.url,
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })

        }
    })

    return {
        props: {
            posts,
            page: response.page,
            totalPage: response.total_pages
        },
        revalidate: 60 * 30 // Atualiza a cada 30 min
    }
}