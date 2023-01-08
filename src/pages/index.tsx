import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import BoehmlerLogo from 'public/böhmler-logo.png'
import { useState } from 'react'
import { Job } from '../types/Job'
import { fakeJobs } from '../data/fakeData'
import JobCard from '../components/JobCard'

export default function Home() {
  const [maxJobCards, setMaxJobCards] = useState<number>(5)
  const [jobCardsQuantity, setJobsQuantity] = useState<number>(fakeJobs.length)

  // Utils
  const loadJobsPagination = () => {
    const jobsList = []

    for (let i = 0; i < maxJobCards && i < jobCardsQuantity; i++) {
      jobsList.push(fakeJobs[i])
    }

    return jobsList.map((job, index) => (
      <JobCard job={job} key={index} />
    ))
  }

  return (
    <>
      <Head>
        <title>KlugJob by stirner/stirner</title>
        <meta name="description" content="Jobs in Pforzheim" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/next.svg" />
      </Head>
      <main className={`${styles.main} ${styles.mainHome}`}>

        <section className={`${styles.section} ${styles.headingSection}`}>
          <div className={styles.container}>
            <div className={styles.homeHeader}>
              <div className={styles.altHeader}>
                <button className={styles.btnPrimary}>Post a Job</button>
                <button className={styles.btnSecondary}>Become a Partner</button>
              </div>
              <h1>KlugJob</h1>
              <h5>by stirner/stirner</h5>
              <div className={styles.inputFilter}>
                <input type="text" placeholder='🔎 Search job (eg. Ausbildung, Webdeveloper), etc' />
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section}`}>
          <div className={styles.container}>
            <div className={styles.picsWrapper}>
              <span>trusted by</span>
              <Image src={BoehmlerLogo} alt='böhmler logo' />
              <Image src={BoehmlerLogo} alt='böhmler logo' />
            </div>
          </div>
        </section>

        <section className={`${styles.section}`}>
          <div className={styles.container}>
            <div className={styles.filtersWrapper}>
              <div className={styles.searchFilter}>
                <select>
                  <option value="" disabled selected>👩‍🎓 Role</option>
                  <option value="">1</option>
                  <option value="">2</option>
                </select>
              </div>
              <div className={styles.searchFilter}>
                <select>
                  <option value="" disabled selected>🧳 Field</option>
                  <option value="">1</option>
                  <option value="">2</option>
                </select>
              </div>
              <div className={styles.searchFilter}>
                <select>
                  <option value="" disabled selected>🌎 Location</option>
                  <option value="">1</option>
                  <option value="">2</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section}`}>
          <div className={styles.container}>
            {loadJobsPagination()}
          </div>
        </section>

        <section className={`${styles.section}`}>
          <div className={styles.container}>
            <div className={styles.moreJobsWrapper}>
              {maxJobCards <= jobCardsQuantity ? <button onClick={() => setMaxJobCards(maxJobCards + 5)}>More jobs 🥷</button> : 'All jobs visualized 💃'}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
