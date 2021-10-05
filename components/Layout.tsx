import Head from "next/head";
import Link from "next/link";
import styles from "../styles/modules/Home.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>01tune</title>
        <meta
          name="description"
          content="Songwriting writer's block? Generate your own songs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={`${styles.container} ${styles.header}`}>
        <h1 className={styles.title}>01tune</h1>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/chords">
                <a>chords</a>
              </Link>
            </li>
            <li>
              <Link href="/lyrics">
                <a>lyrics</a>
              </Link>
            </li>
            <li>
              <Link href="/structure">
                <a>structure</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles.mainAndFooter}>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>(c) 2021</footer>
      </div>
    </>
  );
}
