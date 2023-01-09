import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../../styles/Home.module.scss'

export default function Partner() {
    const route = useRouter()

    useEffect(() => {
        route.replace("/")
    }, [route])

    return (
        <>
            <Head>
                <title>Pforzheim Jobs by stirner/stirner</title>
                <meta name="description" content="Jobs in Pforzheim" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/next.svg" />
            </Head>
            <main className={`${styles.main} ${styles.mainPartnerPage}`}>
                <section className={`${styles.section}`}>
                    <div className={styles.container}>

                    </div>
                </section>
            </main>
        </>
    )
}
