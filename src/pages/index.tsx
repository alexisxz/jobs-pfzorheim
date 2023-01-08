import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import BoehmlerLogo from 'public/böhmler-logo.png'
import StirnerLogo from 'public/stirner-stirner-logo.png'


import React, { useEffect, useState } from 'react'
import { Job } from '../types/Job'
import { fakeJobs } from '../data/fakeData'
import JobCard from '../components/JobCard'

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>(fakeJobs.filter(job => job.status !== false))
  const [jobCardsQuantity, setJobCardsQuantity] = useState<number>(fakeJobs.filter(job => job.status !== false).length)
  const [jobsList, setJobsList] = useState<Job[]>()
  const [maxJobCards, setMaxJobCards] = useState<number>(5)

  //filter
  const [filters, setFilters] = useState({
    title: '',
    role: '',
    field: '',
    location: '',
  })

  useEffect(() => {
    let getJobs = []

    for (let i = 0; i < maxJobCards && i < jobCardsQuantity; i++) {
      getJobs.push(jobs[i])
    }

    setJobsList(getJobs)

  }, [jobCardsQuantity, jobs, maxJobCards])

  useEffect(() => {
    if (!filters.title) return setJobs(fakeJobs.filter(job => job.status !== false))

    let newJobsList = fakeJobs.filter(job => job.status !== false && job.title.includes(filters.title))
    setJobsList(newJobsList)
  }, [filters])

  // handler
  const handleFiltersOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [event.currentTarget.name]: event.currentTarget.value })
  }

  return (
    <>
      <Head>
        <title>Pforzheim Jobs by stirner/stirner</title>
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
              <h1>Pforzheim Jobs</h1>
              <h5>Powered by <strong>stirner/stirner</strong></h5>
              <div className={styles.inputFilter}>
                <input type="text" placeholder='🔎 Search job (e.g. Einkäufer, Webentwickler, etc...)' name='title' value={filters.title} onChange={e => handleFiltersOnChange(e)} />
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section}`}>
          <div className={styles.container}>
            <div className={styles.picsWrapper}>
              <span>trusted by</span>
              <Image src={BoehmlerLogo} alt='böhmler logo' />
              <Image src={StirnerLogo} alt='stirner-stirner logo' />
            </div>
          </div>
        </section>

        <section className={`${styles.section}`}>
          <div className={styles.container}>
            <div className={styles.filtersWrapper}>
              <div className={styles.searchFilter}>
                <select>
                  <option value="" disabled selected>👩‍🎓 Role</option>
                  <option value="">Berufserfahrene*r</option>
                  <option value="">Student*in</option>
                </select>
              </div>
              <div className={styles.searchFilter}>
                <select>
                  <option value="" disabled selected>🧳 Field</option>
                  <option value="">Einkauf</option>
                  <option value="">Automatendrehtechnik</option>
                </select>
              </div>
              <div className={styles.searchFilter}>
                <select>
                  <option value="" disabled selected>🌎 Location</option>
                  <option value="">Pforzheim Süd</option>
                  <option value="">Pforzheim Nord</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section}`}>
          <div className={styles.container}>
            {jobsList?.map((job, index) => (
              <JobCard job={job} key={index} />
            ))}
          </div>
        </section>

        <section className={`${styles.section}`}>
          <div className={styles.container}>
            <div className={styles.moreJobsWrapper}>
              {filters.title ? <p>Jobs gefunden: {jobsList?.length}</p> : maxJobCards <= jobCardsQuantity ? <button onClick={() => setMaxJobCards(maxJobCards + 5)}>More jobs 🥷</button> : 'All jobs visualized 💃'}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
