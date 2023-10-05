import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/home.module.scss'
import Image from 'next/image'
import { FaArrowUp } from 'react-icons/fa'

import techsImage from '@/public/images/about.png'
import { getPrismicClient } from '../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom';
import { useEffect, useState } from 'react'



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
  citacao: string;
}

interface ContentProps {
  content: Content
}

export default function Home({ content }: ContentProps) {
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

  return (
    <>
      <Head>
        <title>Portfólio | Tiago Machado</title>
        <meta property="og:title" content="Tiago Machado" />
        <meta property="og:description" content="Portfólio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfolio-trsmrs.vercel.app" />
        <meta name="keywords" content="REACT, CSS, NEXT" />
        <meta property="og:image" content="https://images.prismic.io/trsm/c80277d5-a786-45a2-9c33-ea96f85c8eed__77bd0436-a0b0-4bf8-bb4b-71774c16b781-removebg.png?auto=compress,format" />
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <img src='/images/appweb.png' alt='conteúdos'
            />
            <a href={content.linkAction} target='_blank'>
              <button>
               Entrar em contato
              </button>
              <br />
              <span>{content.titleContent}</span>
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
          <h2>Estas são as <span>Stacks</span> que venho estudando</h2>
          <Image src={techsImage} alt='tecnologia'
            quality={100}
            width={460}
          />
          <span>{content.citacao}</span>
          <a href={content.linkAction} target='_blank'>
            <button>Entrar em contato</button>
          </a>
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
    Prismic.Predicates.at('document.type', 'home')
  ])

  const {
    title, sub_title, link_action,
    mobile, mobile_content, mobile_bannser,
    title_web, web_content, web_banner, citacao
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
    webBanner: web_banner.url,
    citacao: RichText.asText(citacao)
  }

  return {
    props: {
      content
    },
    revalidate: 60 * 2
  }
}
