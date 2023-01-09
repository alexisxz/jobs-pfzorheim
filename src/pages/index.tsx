import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import BoehmlerLogo from 'public/böhmler-logo.png'
import StirnerLogo from 'public/stirner-stirner-logo.png'
import PolyRackLogo from 'public/polyrack-logo.jpeg'


import React, { useEffect, useState } from 'react'
import { Job } from '../types/Job'
import { fakeJobs } from '../data/fakeData'
import JobCard from '../components/JobCard'
import { clearFilters, formatHomeFilter } from '../helpers/formatHomeFilters'

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>(fakeJobs.filter(job => job.status !== false))
  const [jobCardsQuantity, setJobCardsQuantity] = useState<number>(fakeJobs.filter(job => job.status !== false).length)
  const [jobsList, setJobsList] = useState<Job[]>()
  const [maxJobCards, setMaxJobCards] = useState<number>(5)

  //filter
  const [filtersCategory, setFiltersCategory] = useState(formatHomeFilter)
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
    if (!filters.title && !filters.field && !filters.role && !filters.location) return setJobs(fakeJobs.filter(job => job.status !== false))

    let newJobsList = fakeJobs.filter(job => job.status !== false && job.title.includes(filters.title))

    if (filters.role !== '') newJobsList = fakeJobs.filter(job => job.status !== false && job.title.includes(filters.title) && job.role === filters.role)

    if (filters.field !== '') newJobsList = fakeJobs.filter(job => job.status !== false && job.title.includes(filters.title) && job.field === filters.field)

    if (filters.location !== '') newJobsList = fakeJobs.filter(job => job.status !== false && job.title.includes(filters.title) && job.location === filters.location)

    if (filters.role !== '' && filters.field !== '') newJobsList = fakeJobs.filter(job => job.status !== false && job.title.includes(filters.title) && job.role === filters.role && job.field === filters.field)

    if (filters.role !== '' && filters.location !== '') newJobsList = fakeJobs.filter(job => job.status !== false && job.title.includes(filters.title) && job.role === filters.role && job.location === filters.location)

    if (filters.field !== '' && filters.location !== '') newJobsList = fakeJobs.filter(job => job.status !== false && job.title.includes(filters.title) && job.field === filters.field && job.location === filters.location)

    if (filters.field !== '' && filters.location !== '' && filters.role) newJobsList = fakeJobs.filter(job => job.status !== false && job.title.includes(filters.title) && job.field === filters.field && job.location === filters.location && job.role === filters.role)

    setJobsList(newJobsList)
  }, [filters])

  // handler
  const handleFiltersOnChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
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
                <input type="text" placeholder='🔎 Search job (e.g. Mechaniker, Ausbildung, etc...)' name='title' value={filters.title} onChange={e => handleFiltersOnChange(e)} />
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section}`}>
          <div className={styles.container}>
            <div className={styles.picsWrapper}>
              <span>trusted by</span>
              <Image src={PolyRackLogo} alt='PolyRack logo' />
            </div>
          </div>
        </section>

        <section className={`${styles.section}`}>
          <div className={styles.container}>
            <div className={styles.filtersWrapper}>
              <div className={styles.searchFilter}>
                <select name='role' value={filters.role} onChange={e => handleFiltersOnChange(e)}>
                  <option value="" selected>👩‍🎓 Role</option>
                  {filtersCategory?.role.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className={styles.searchFilter}>
                <select name='field' value={filters.field} onChange={e => handleFiltersOnChange(e)}>
                  <option value="" selected>🧳 Field</option>
                  {filtersCategory?.field.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className={styles.searchFilter}>
                <select name='location' value={filters.location} onChange={e => handleFiltersOnChange(e)}>
                  <option value="" selected>🌎 Location</option>
                  {filtersCategory?.location.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className={styles.searchFilterCleaning}>
                <a onClick={() => setFilters(clearFilters)}>Filter zurücksetzen 🕵🏼‍♂️</a>
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
              {filters.title || filters.location || filters.field || filters.role ? <p>Jobs gefunden: {jobsList?.length}</p> : maxJobCards <= jobCardsQuantity ? <button onClick={() => setMaxJobCards(maxJobCards + 5)}>More jobs 🥷</button> : 'All jobs visualized 💃'}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
