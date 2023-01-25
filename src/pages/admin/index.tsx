import { signOut } from 'firebase/auth'
import { collection, doc, documentId, getDoc, getDocs, query, where } from 'firebase/firestore'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BottomAdminNav from '../../components/BottomAdminNav'
import { auth, database } from '../../firebase'
import { formatDate } from '../../helpers/formatDate'
import styles from '../../styles/Admin.module.scss'
import { Candidate } from '../../types/Candidate'
import { Job } from '../../types/Job'

type Props = {}

export default function Index({ }: Props) {
    const route = useRouter()

    const [user, setUser] = useState<any>({})

    const [jobs, setJobs] = useState<any[]>([])
    const [filterdJobs, setFilteredJobs] = useState<Job[]>([])

    const [filters, setFilters] = useState({
        title: '',
        role: '',
        field: '',
        location: '',
        company: '',
    })

    useEffect(() => {
        isUserLogged()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!user) return
        fetchData()
    }, [user])

    useEffect(() => {
        if (!jobs) return
        setFilteredJobs(jobs)
    }, [jobs])

    useEffect(() => {
        if (!jobs) return

        if (!filters.title) return setFilteredJobs(jobs)

        setFilteredJobs(jobs.filter(job => (job.title.includes(filters.title) || job.id.includes(filters.title))))
    }, [filters])


    // check if the user is logged
    const isUserLogged = async () => {
        await auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                if (!authUser.email) return

                // getting user infos
                const docRef = doc(database, "users", authUser.uid)
                const docSnap = await getDoc(docRef)
                setUser(docSnap.data())

            } else {
                route.replace("/admin/login")
            }

        })
    }

    // get jobs and applicants
    const fetchData = async () => {
        if (!user.company) return

        const jobsDatabaseRef = query(collection(database, "jobs"), where("companyId", "==", user.company))
        const candidatesDatabaseRef = query(collection(database, "candidates"), where("companyId", "==", user.company))


        await getDocs(jobsDatabaseRef)
            .then((response) => {
                setJobs(response.docs.map(job => {
                    if (!job.data().companyId) return
                    if (!job.data().startingDate) return { ...job.data(), id: job.id, startingDate: '', postedDate: job.data().postedDate.toDate() }
                    return { ...job.data(), id: job.id, startingDate: job.data().startingDate.toDate(), postedDate: job.data().postedDate.toDate() }
                }))
            })
    }

    //handles
    const handleFiltersOnChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => { route.replace("/admin/login") })
            .catch(() => { alert('Fehler, Bitte informieren Sie Ihren Vorgesetzten ') })
    }

    return (
        <>
            <Head>
                <title>Pforzheim Jobs Admin panel</title>
                <meta name="description" content="Admin Panel" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/next.svg" />
            </Head>
            <main className={styles.main}>
                <section className={`${styles.section} ${styles.headingSection}`}>
                    <div className={styles.container}>
                        <div className={styles.adminHeading}>
                            <h2>{user.greetings}, willkommen!</h2>
                            <div className={styles.inputFilter}>
                                <input type="text" placeholder='🔎 Nach JobId oder Titel filtern (z.B. Mechaniker, Ausbildung, etc...)' name='title' value={filters.title} onChange={e => handleFiltersOnChange(e)} />
                            </div>
                            <div>
                                <button className={styles.btnSecondary} onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.container}>
                        {filterdJobs.map((job: Job) => (
                            <div key={job.id} className={styles.adminJobCard}>
                                <h5>{job.id}</h5>
                                <h3>{job.title}</h3>
                                <p><span>📺 Status:</span>{job.status === true ? '🟢 On' : '🔴 Off'}</p>
                                <p><span>🏗 Hergestellt in:</span>{formatDate(job.postedDate)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <BottomAdminNav />

            </main>
        </>
    )
}