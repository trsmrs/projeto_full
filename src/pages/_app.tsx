import type { AppProps } from 'next/app'
import type { Metadata } from 'next'
import '../styles/global.scss'

import { Header } from '../components/Header'


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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
