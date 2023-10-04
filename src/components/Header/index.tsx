import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../public/images/logos.png';


import { ActiveLink } from '../ActiveLink';
import { Metadata } from 'next';

export const metadata: Metadata = {
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

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <ActiveLink href='/' activeClassName={styles.active}>
                    <p id='topo'>
                        <Image src={logo} alt='logo-imagem' />
                    </p>
                </ActiveLink>

                <nav>
                    <ActiveLink href='/' activeClassName={styles.active}>
                        <p>Home</p>
                    </ActiveLink>
                    <ActiveLink href='/posts' activeClassName={styles.active}>
                        <p>Conteúdo</p>
                    </ActiveLink>
                    <ActiveLink href='/sobre' activeClassName={styles.active}>
                        <p>Quem Sou?</p>
                    </ActiveLink>
                </nav>

                <a className={styles.gitButton} type='button' href='https://github.com/trsmrs' target='_blank'>REPOSITÓRIOS</a>
            </div>
        </header>
    )
}
