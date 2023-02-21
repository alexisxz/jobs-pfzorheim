import Head from 'next/head'
import React from 'react'
import BottomAdminNav from '../../components/BottomAdminNav'
import styles from '../../styles/Admin.module.scss'

type Props = {

}

export default function CreateJob({ }: Props) {
    return (
        <>
            <Head>
                <title>Create Jobs Admin panel</title>
                <meta name="description" content="Admin Panel" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/next.svg" />
            </Head>
            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <form className={styles.createJobForm}>
                            <div>
                                <label>💬 Titel: </label>
                                <input type="text" />
                            </div>

                            <div className={styles.createJobGrid}>
                                <div>
                                    <label>*🌎 Standort: </label>
                                    <input type="text" />
                                </div>
                                <div>
                                    <label>*🧳 Arbeitsbereiche: </label>
                                    <input type="text" />
                                </div>
                                <div>
                                    <label>*👩‍🎓 Einstieg als: </label>
                                    <input type="text" />
                                </div>
                                <div>
                                    <label>🗓 Startdatum: </label>
                                    <input type="date" />
                                </div>
                                <div>
                                    <label>*⏰ Arbeitszeit: </label>
                                    <input type="text" />
                                </div>
                                <div>
                                    <label>*🏭 Rechtseinheit: </label>
                                    <input type="text" />
                                </div>
                            </div>

                            <div>
                                <label>kurze Beschreibung: </label>
                                <textarea style={{ width: '100%', height: 100 }} />
                            </div>

                            <div>
                                <label>Text: </label>
                                <textarea style={{ width: '100%', height: 400 }} />
                            </div>

                            <div>
                                <button>Save</button>
                                <button>Cancel</button>
                            </div>
                        </form>
                    </div>
                </section>
                <BottomAdminNav />
            </main>
        </>
    )
}