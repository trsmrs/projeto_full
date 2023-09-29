import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/home.module.scss'
import Image from 'next/image'

import techsImage from '@/public/images/techs.svg'

import { getPrismicClient } from '../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom';
// import { PrismicRichText  } from '@prismicio/react'


type Content = {
  title: string;
  titleContent: string;
  linkAction: string;
  mobileTitle: string;
  mobileContent: string;
  mobileBanner: string;
  webTitle: string;
  webContent: string;
  webBanner: string;
}

interface ContentProps {
  content: Content
}

export default function Home({ content }: ContentProps) {

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <span>{content.titleContent}</span>
            <img src='/images/appweb.png' alt='conteúdos' />
            <a href={content.linkAction} target='_blank'>
              <button>
                Contacte-me
              </button>
            </a>
          </section>
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <section>
            <h2>{content.mobileTitle}</h2>
            <span>{content.mobileContent}</span>
          </section>

          <img src={content.mobileBanner} alt="Conteúdos desenvolvimento de apps" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <img src={content.webBanner} alt="Conteúdos desenvolvimento de aplicacoes web" />

          <section>
            <h2>{content.webTitle}</h2>
            <span>{content.webContent}</span>
          </section>
        </div>

        <hr className={styles.divisor} />

        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt='tecnologia' />
          <h2>Estas são as <span className={styles.alunos}>Stacks</span> que venho estudando</h2>
          <span>“O conhecimento fala, mas a sabedoria ouve.” (Jimi Hendrix)</span>
          <a href={content.linkAction} target='_blank'>
            <button>Contacte-me</button>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])

  const {
    title, sub_title, link_action,
    mobile, mobile_content, mobile_bannser,
    title_web, web_content, web_banner
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    linkAction: link_action.url,
    mobileTitle: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_bannser.url,
    webTitle: RichText.asText(title_web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url
  }

  return {
    props: {
      content
    },
    revalidate: 60 * 2
  }
}