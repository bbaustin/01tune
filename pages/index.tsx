import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>01tune</title>
        <meta name="description" content="Songwriting writer's block? Generate your own songs." />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          01tune
        </h1>
      </main>

      <footer className={styles.footer}>
          (c) 2021
      </footer>
    </div>
  )
}

export default Home
