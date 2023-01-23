import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import BoehmlerLogo from 'public/böhmler-logo.png'
import React, { useEffect, useState } from 'react'
import JobCard from '../components/JobCard'
import { clearFilters, formatHomeFilter } from '../helpers/formatHomeFilters'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { database } from '../firebase'
import { Job } from '../types/Job'
import { Company } from '../types/Company'
import { Candidate } from '../types/Candidate'

export default function Boehmler() {
    const companyId: string = 'xL0QBoIDtlhJxVxcntPB'

    const jobsDatabaseRef = query(collection(database, "jobs"), where("companyId", "==", companyId))
    const companiesDatabaseRef = collection(database, "companies")
    const candidatesDatabaseRef = collection(database, "candidates")

    const [jobs, setJobs] = useState<Job[] | any>([])
    const [companies, setCompanies] = useState<Company[] | any>([])
    const [candidates, setCandidates] = useState<Candidate[] | any>([])

    const [jobCardsQuantity, setJobCardsQuantity] = useState<number>(0)
    const [jobsList, setJobsList] = useState<Job[]>()
    const [maxJobCards, setMaxJobCards] = useState<number>(5)

    //filter
    const [filtersCategory, setFiltersCategory] = useState<any>()
    const [filters, setFilters] = useState({
        title: '',
        role: '',
        field: '',
        location: '',
        company: '',
    })

    useEffect(() => {
        readDataFirestore()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!jobs || !companies) return

        if (!jobs || !companies) return
        setFiltersCategory(formatHomeFilter(jobs, companies))
        setJobCardsQuantity(jobs.length)
        let getJobs: Job[] = []

        for (let i = 0; i < maxJobCards && i < jobCardsQuantity; i++) {
            getJobs.push(jobs[i])
        }

        setJobsList(getJobs.sort((a, b) => a.postedDate.getTime() - b.postedDate.getTime()))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobs, companies])

    useEffect(() => {
        if (!filters.title && !filters.field && !filters.role && !filters.location && !filters.company) return setJobsList(jobs)

        const filteredCompanyId = companies.find((company: Company) => company.name === filters.company)?.id

        let newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)))

        //allone filters
        if (filters.company !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && filteredCompanyId === job.companyId)

        if (filters.role !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && job.role === filters.role)

        if (filters.field !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && job.field === filters.field)

        if (filters.location !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && job.location === filters.location)

        // couple filters
        if (filters.role !== '' && filters.field !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && job.role === filters.role && job.field === filters.field)

        if (filters.role !== '' && filters.location !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && job.role === filters.role && job.location === filters.location)

        if (filters.field !== '' && filters.location !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && job.field === filters.field && job.location === filters.location)

        if (filters.role !== '' && filters.company !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && job.role === filters.role && filteredCompanyId === job.companyId)

        if (filters.field !== '' && filters.company !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && job.field === filters.field && filteredCompanyId === job.companyId)

        if (filters.location !== '' && filters.company !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && job.location === filters.location && filteredCompanyId === job.companyId)

        // tripple filters
        if (filters.field !== '' && filters.location !== '' && filters.role !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && job.field === filters.field && job.location === filters.location && job.role === filters.role)

        if (filters.company !== '' && filters.location !== '' && filters.role !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && filteredCompanyId === job.companyId && job.location === filters.location && job.role === filters.role)

        if (filters.company !== '' && filters.field !== '' && filters.role !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && filteredCompanyId === job.companyId && job.field === filters.field && job.role === filters.role)

        if (filters.company !== '' && filters.location !== '' && filters.field !== '') newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && filteredCompanyId === job.companyId && job.location === filters.location && job.field === filters.field)

        // all filters
        if (filters.company !== '' && filters.location !== '' && filters.field !== '' && filters.role) newJobsList = (jobs).filter((job: Job) => job.status !== false && (job.title.includes(filters.title) || job.id.includes(filters.title)) && filteredCompanyId === job.companyId && job.location === filters.location && job.field === filters.field && job.role === filters.role)

        setJobsList(newJobsList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    // get and readers
    const readDataFirestore = async () => {
        await getDocs(jobsDatabaseRef)
            .then((response) => {
                setJobs(response.docs.map(job => {
                    if (!job.data().startingDate) return { ...job.data(), id: job.id, startingDate: '', postedDate: job.data().postedDate.toDate() }
                    return { ...job.data(), id: job.id, startingDate: job.data().startingDate.toDate(), postedDate: job.data().postedDate.toDate() }
                }))
            })

        await getDocs(companiesDatabaseRef).then((response) => {
            setCompanies(response.docs.map(company => {
                return { ...company.data(), id: company.id }
            }))
        })

        await getDocs(candidatesDatabaseRef).then((response) => {
            setCandidates(response.docs.map(candidate => {
                return { ...candidate.data(), id: candidate.id }
            }))
        })
    }

    // handler
    const handleFiltersOnChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [event.currentTarget.name]: event.currentTarget.value })
    }

    return (
        <>
            <Head>
                <title>Jobs by Böhmler GmbH</title>
                <meta name="description" content="Jobs by Böhmler GmbH" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/next.svg" />
            </Head>
            <main className={`${styles.main} ${styles.mainHome}`}>

                <section style={{ marginBottom: '1rem' }} className={`${styles.section} ${styles.headingSection}`}>
                    <div className={styles.container}>
                        <div className={styles.homeHeader}>
                            <h1>Böhmler Jobs</h1>
                            <h5>Powered by <strong>Böhmler GmbH</strong></h5>
                            <Image src={BoehmlerLogo} alt='Stirner logo' className={styles.stirnerLogo} />
                            <div className={styles.inputFilter}>
                                <input type="text" placeholder='🔎 Search job by JobID or by title (z.B. Mechaniker, Ausbildung, etc...)' name='title' value={filters.title} onChange={e => handleFiltersOnChange(e)} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className={`${styles.section}`}>
                    <div className={styles.container}>
                        <div className={styles.filtersWrapper}>
                            <div className={styles.searchFilter}>
                                <select name='role' value={filters.role} onChange={e => handleFiltersOnChange(e)}>
                                    <option value="" selected>👩‍🎓 Einstieg als</option>
                                    {filtersCategory?.role.map((item: any, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.searchFilter}>
                                <select name='field' value={filters.field} onChange={e => handleFiltersOnChange(e)}>
                                    <option value="" selected>🧳 Arbeitsbereiche</option>
                                    {filtersCategory?.field.map((item: any, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.searchFilter}>
                                <select name='location' value={filters.location} onChange={e => handleFiltersOnChange(e)}>
                                    <option value="" selected>🌎 Standort</option>
                                    {filtersCategory?.location.map((item: any, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.searchFilterCleaning}>
                                <button onClick={() => setFilters(clearFilters)}>Filter zurücksetzen 🕵🏼‍♂️</button>
                            </div>
                        </div>

                    </div>
                </section>

                <section className={`${styles.section}`}>
                    <div className={styles.container}>
                        {jobsList?.map((job: Job) => (
                            <JobCard job={job} companies={companies} candidates={candidates} key={job.id} />
                        ))}
                    </div>
                </section>

                <section className={`${styles.section}`}>
                    <div className={styles.container}>
                        <div className={styles.moreJobsWrapper}>
                            {filters.title || filters.location || filters.field || filters.role || filters.company ? <p>Jobs gefunden: {jobsList?.length}</p> : maxJobCards <= jobCardsQuantity ? <button onClick={() => setMaxJobCards(maxJobCards + 5)}>More jobs 🥷</button> : 'All jobs visualized 💃'}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

