import Head from "next/head"
import { GetStaticProps } from "next"


import styles from './styles.module.scss'
import { getPrismicClient } from "@/src/services/prismic"
import Prismic from "@prismicio/client"
import { RichText } from 'prismic-dom'


import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'

type Content = {
    title: string;
    paragrafo: string;
    description: string;
    banner: string;
    instagram: string;
    linkedin: string;
    github: string;
}

interface ContentProps {
    content: Content
}


export default function About({ content }: ContentProps) {

    return (
        <>
            <Head>
                <title>Sobre mim</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <section className={styles.ctaText}>
                        <h1>{content.title}</h1>
                        <p>{content.description}</p>
                        <br />
                        <div className={styles.separator}>
                            <a href={content.instagram} target="_blank">
                                <FaInstagram size={40} />
                            </a>

                            <a href={content.linkedin} target="_blank">
                                <FaLinkedin size={40} />
                            </a>

                            <a href={content.github} target="_blank">
                                <FaGithub size={40} />
                            </a>
                        </div>
                        <br />
                        <br />
                        <p>{content.paragrafo}</p>

                    </section>
                    <img src={content.banner}
                        alt="Sobre Tiago Machado"
                    />
                </div>
                <br />
            </main>
        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'about')
    ])

    const {
        title,
        paragrafo,
        description,
        banner,
        instagram,
        linkedin,
        github
    } = response.results[0].data


    const content = {
        title: RichText.asText(title),
        paragrafo: RichText.asText(paragrafo),
        description: RichText.asText(description),
        banner: banner.url,
        instagram: instagram.url,
        linkedin: linkedin.url,
        github: github.url

    }

    return {
        props: {
            content
        
        },
        revalidate: 60 * 30 // revalidar a cada 30 minutos
    }
}