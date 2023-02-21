import { formatDate } from "../helpers/formatDate"
import { Candidate } from "../types/Candidate"
import styles from '../styles/Admin.module.scss'
import React, { useEffect, useState } from "react"
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { database } from "../firebase"
import { Job } from "../types/Job"
import { useRouter } from "next/router"


type Props = {
    candidate: Candidate
}

export default function CandidateCard({ candidate }: Props) {
    const route = useRouter()

    const [candidateJob, setCandidateJob] = useState<any>({})
    const [candidateStatus, setCandidateStatus] = useState<string>(candidate.status)
    const [candidateComments, setCandidateComments] = useState<string | undefined>(candidate.comments)
    const [candidateResponsible, setCandidateResponsible] = useState<string | undefined>(candidate.responsible)
    const [companyUsers, setCompanyUsers] = useState<string[]>([])

    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false)

    useEffect(() => {
        if (!candidate) return
        fetchCandidateJob()
        fetchAllCompanyUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //handles
    const handleStatusOnChange = async (e: string) => {
        setCandidateStatus(e)

        const docRef = doc(database, "candidates", candidate.id)

        await updateDoc(docRef, {
            status: e
        })

    }

    const handleResponsibleOnChange = async (e: string) => {
        setCandidateResponsible(e)

        const docRef = doc(database, "candidates", candidate.id)

        await updateDoc(docRef, {
            responsible: e
        })
    }

    //submits and clicks
    const submitComments = async () => {
        const docRef = doc(database, "candidates", candidate.id)

        await updateDoc(docRef, {
            comments: candidateComments
        })

        alert('Kommentare geändert')
    }

    const handleDeleteCandidateOnClick = async () => {

        const docRef = doc(database, "candidates", candidate.id)

        await deleteDoc(docRef)

        setIsPopupVisible(false)
        route.reload()
    }

    // fethcs
    const fetchCandidateJob = async () => {
        const docRef = doc(database, "jobs", candidate.jobId)
        const docSnap = await getDoc(docRef)

        if (!docSnap) return

        setCandidateJob({ ...docSnap.data(), id: docSnap.id })
    }

    const fetchAllCompanyUsers = async () => {
        const usersRef = query(collection(database, "users"), where("companyId", "==", candidate.companyId))

        await getDocs(usersRef)
            .then(response => {
                setCompanyUsers(response.docs.map(user => {
                    return user.data().greetings
                }))
            })
    }

    return (
        <>
            <div key={candidate.id} className={styles.adminCard}>
                <p><span>🏗 Hergestellt in:</span>{formatDate(candidate.postedDate)}</p>
                <h5>{candidate.id}</h5>
                <h3>{candidate.name}</h3>
                <p><span>👽 Kontakt:</span>{candidate.phone} {candidate.email}</p>
                <div>
                    <span>📍 Schritt:</span>
                    <select value={candidateStatus} onChange={e => handleStatusOnChange(e.target.value)}>
                        <option value="Neu">⚪️ Neu</option>
                        <option value="Interview">🔵 Interview</option>
                        <option value="Zurechtgewiesen">🟢 Zurechtgewiesen</option>
                        <option value="Zugelassen">🔴 Zugelassen</option>
                    </select>
                </div>
                <a href={candidate.attachment} target='_blank' rel="noreferrer" >📑</a>

            </div>
            <div className={styles.adminCardFooter}>
                <h5>{candidateJob.id}</h5>
                <h3>{candidateJob.title}</h3>
                <div style={{ marginLeft: 'auto' }}>
                    <span>Kandidat verantwortlich: </span>
                    <select value={candidateResponsible} onChange={e => handleResponsibleOnChange(e.target.value)}>
                        <option value=""></option>
                        {companyUsers.map(user => (
                            <option value={user} key={user}>{user}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.adminCardCommentArea}>
                <textarea placeholder="etwas über den Bewerber sagen" value={candidateComments} onChange={e => setCandidateComments(e.target.value)} />
                <div>
                    <a onClick={() => submitComments()}>📀 Speichern</a>
                    <a onClick={() => !candidateComments ? setCandidateComments('') : setCandidateComments(candidate.comments)}>🪦 Abbrechen</a>
                    <button onClick={() => setIsPopupVisible(true)}>🗑 Kandidat löschen</button>
                </div>
            </div>
            {!isPopupVisible ? '' : (
                <div className={styles.deleteCandidatePopup}>
                    <p>Wenn Sie den Kandidaten löschen, können Sie ihn nicht wiederherstellen. Wenn Sie den Kontakt trotzdem haben möchten, ändern Sie einfach den Status auf „Zugelassen“.</p>
                    <p>Möchten Sie den Kandidaten trotzdem löschen?</p>
                    <p>Bewerber:in: <strong>{candidate.name}</strong> Job: <strong>{candidateJob.title}</strong></p>
                    <div>
                        <button className={styles.btnSecondary} onClick={() => handleDeleteCandidateOnClick()}>Ja</button>
                        <button className={styles.btnPrimary} onClick={() => setIsPopupVisible(false)}>Nein</button>
                    </div>
                </div>
            )}
        </>
    )
}