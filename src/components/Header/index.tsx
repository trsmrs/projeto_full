import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../public/images/logos.png';


import { ActiveLink } from '../ActiveLink';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <ActiveLink href='/' activeClassName={styles.active}>
                    <p>
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
