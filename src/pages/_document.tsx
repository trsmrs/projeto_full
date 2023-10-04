import { Metadata } from 'next'
import { Html, Head, Main, NextScript } from 'next/document'

export const metadata: Metadata = {
  title: 'Trsm |',
  description: '',
  keywords: ['HTML', 'CSS', 'JAVASCRIPT', 'REACT'],
  openGraph: {
    images: ['https://images.prismic.io/trsm/c80277d5-a786-45a2-9c33-ea96f85c8eed__77bd0436-a0b0-4bf8-bb4b-71774c16b781-removebg.png?auto=compress,format']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true
    }
  }
}

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <link rel='shortcut icon' href='/favicon.ico' type='image/ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
