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

    const [candidates, setCandidates] = useState<any[]>([])
    const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([])

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
        if (!candidates) return
        setFilteredCandidates(candidates)
    }, [candidates])

    useEffect(() => {
        if (!candidates) return

        if (!filters.title) return setFilteredCandidates(candidates)

        setFilteredCandidates(candidates.filter(candidate => (candidate.title.includes(filters.title) || candidate.id.includes(filters.title))))
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

        const candidatesDatabaseRef = query(collection(database, "candidates"), where("companyId", "==", user.company))

        await getDocs(candidatesDatabaseRef)
            .then((response) => {
                setCandidates(response.docs.map(candidate => {
                    if (!response) return
                    return { ...candidate.data(), id: candidate.id, postedDate: candidate.data().postedDate.toDate() }
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
                        {filteredCandidates.map((candidate: Candidate) => (
                            <div key={candidate.id} className={styles.adminJobCard}>
                                <h5>{candidate.id}</h5>
                                <h3>{candidate.name}</h3>
                                <p><span>🏗 Hergestellt in:</span>{formatDate(candidate.postedDate)}</p>
                                <a href={candidate.attachment} target='_blank' rel="noreferrer" >📑</a>
                            </div>
                        ))}
                    </div>
                </section>

                <BottomAdminNav />

            </main>
        </>
    )
}