import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';
import Link from 'next/link';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <nav>              
                    <ActiveLink href='/' activeClassName={styles.active}>
                       
                    <p id='topo'>
                       Projetos 
                    </p>
                      
                       
                    </ActiveLink>

                    <ActiveLink href='/sobre' activeClassName={styles.active}>
                        <p>Quem Sou?</p>
                    </ActiveLink>

                </nav>

                <a className={styles.gitButton} type='button' href='https://github.com/trsmrs' target='_blank'>REPOSITÓRIOS</a>
                <a className={styles.whats} type='button' href='https://wa.me/5551933001737' target='_blank'>WhatsApp</a>
            </div>
        </header>
    )
}
