import { signOut } from 'firebase/auth'
import { collection, doc, documentId, getDoc, getDocs, query, where } from 'firebase/firestore'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BottomAdminNav from '../../components/BottomAdminNav'
import CandidateCard from '../../components/CandidateCard'
import { auth, database } from '../../firebase'
import styles from '../../styles/Admin.module.scss'
import { Candidate } from '../../types/Candidate'

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
        companyId: '',
    })

    useEffect(() => {
        isUserLogged()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!user) return
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
        if (!candidates) return
        setFilteredCandidates(candidates.sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime()))
    }, [candidates])

    useEffect(() => {
        if (!candidates) return

        if (!filters.title) return setFilteredCandidates(candidates)

        setFilteredCandidates(candidates.filter(candidate => (candidate.title.includes(filters.title) || candidate.id.includes(filters.title))))
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (!user.companyId) return

        const candidatesDatabaseRef = query(collection(database, "candidates"), where("companyId", "==", user.companyId))

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
                <title>Pforzheim Candidates Admin panel</title>
                <meta name="description" content="Admin Panel" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/next.svg" />
            </Head>
            <main className={styles.main}>
                <section className={`${styles.section} ${styles.headingSection}`}>
                    <div className={styles.container}>
                        <div className={styles.adminHeading}>
                            <h2>👾 {user.greetings}, willkommen!</h2>
                            <div className={styles.inputFilter}>
                                <input type="text" placeholder='🔎 Nach JobId oder Titel filtern (z.B. Mechaniker, Ausbildung, etc...)' name='title' value={filters.title} onChange={e => handleFiltersOnChange(e)} />
                            </div>
                            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                                <button className={styles.btnPrimary}><Link style={{ color: "var(--color-white)" }} href={"/admin/profile"}>Profile bearbeiten</Link></button>
                                <button className={styles.btnSecondary} onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={`${styles.container} ${styles.adminContainer}`}>
                        {filteredCandidates.map((candidate: Candidate) => (
                            <CandidateCard key={candidate.id} candidate={candidate} />
                        ))}
                    </div>
                </section>

                <BottomAdminNav />

            </main>
        </>
    )
}