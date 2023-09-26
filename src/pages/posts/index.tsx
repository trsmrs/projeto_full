import Link from 'next/link'
import styles from './styles.module.scss'
import Head from 'next/head'
import Image from 'next/image'

import thumb from '@/public/images/thumb.png'

import { FiChevronLeft, FiChevronRight, FiChevronsRight, FiChevronsLeft } from 'react-icons/fi'

export default function Posts() {
    return (
        <>
            <Head>
                <title>Blog | Sujeito Programador</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <Link href="/">
                            <Image src={thumb}
                                alt='titulo da imagem'
                                width={720}
                                height={410}
                                quality={100}
                                draggable={false}
                            />
                            <strong>Criando meu primeiro aplicativo</strong>
                            <time>26 de Setembro 2023</time>
                            <p>Hoje vamos criar o controle de mostrar a senha input, uma opção...</p>       
                    </Link>

                    <div className={styles.buttonNavigate}>
                        <div>
                            <button>
                                <FiChevronsLeft size={25} color="#FFF"/>
                            </button>
                            <button>
                                <FiChevronLeft size={25} color="#FFF"/>
                            </button>
                        </div>

                        <div>
                            <button>
                                <FiChevronRight size={25} color="#FFF"/>
                            </button>
                            <button>
                                <FiChevronsRight size={25} color="#FFF"/>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}