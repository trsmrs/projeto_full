import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/home.module.scss'
import Image from 'next/image'

import techsImage from '@/public/images/techs.svg'

import {getPrismicClient} from '../services/prismic'
import Prismic from '@prismicio/client'
import {RichText} from 'prismic-dom';


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

interface ContentProps{
  content: Content
}

export default function Home({content}: ContentProps) {
  console.log(content)
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>Levando você ao próximo nível</h1>
            <span>Uma plataforma com cursos que vão do zero até o profissional na pratica.</span>
            <a>
              <button>
                COMECE AGORA!
              </button>
            </a>
          </section>
          <img src='/images/banner-conteudos.png' alt='conteúdos' />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <section>
            <h2>Aprenda a criar aplicativos para Android e iOS</h2>
            <span>Você vai descobrir o jeito mais moderno de desenvolver apps nativos para iOS e Android.</span>
          </section>

          <img src='/images/financasApp.png' alt='cunteúdos mobile: desenvolvimento de apps' />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <img src='/images/webDev.png' alt='cunteúdos Web' />

          <section>
            <h2>Aprenda a criar Aplicações Web</h2>
            <span>Você vai descobrir o jeito mais moderno de desenvolver apps Web.</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt='tecnologia' />
          <h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira ao próximo nível</h2>
          <span>E você, Vai perder a chance de evoluir na carreira de Dev?</span>
          <a>
            <button>COMEÇAR AGORA!</button>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () =>{

    const prismic = getPrismicClient()

    const response = await prismic.query([
      Prismic.Predicates.at('document.type', 'home')
    ])

   const {
    title, sub_title, link_action,
    mobile, mobile_content, mobile_bannser,
    title_web,  web_content, web_banner
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

  return{
    props:{
      content
    },
    revalidate: 60 * 2
  }
}