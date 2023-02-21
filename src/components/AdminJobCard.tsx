import React, { useState } from 'react'
import { Job } from '../types/Job'
import styles from '../styles/Admin.module.scss'
import { formatDate } from '../helpers/formatDate'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { database } from '../firebase'
import { useRouter } from 'next/router'

type Props = {
    job: Job
}

export default function AdminJobCard({ job }: Props) {
    const route = useRouter()

    const [jobComments, setJobComments] = useState<string | undefined>(job.comments)

    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false)

    //handles
    const handleDeleteJobOnClick = async () => {
        const docRef = doc(database, "jobs", job.id)

        await deleteDoc(docRef)

        setIsPopupVisible(false)
        route.reload()
    }

    // submits and clicks
    const submitComments = async () => {
        const docRef = doc(database, "jobs", job.id)

        await updateDoc(docRef, {
            comments: jobComments
        })

        alert("Kommentare gespeichert")
    }

    return (
        <>
            <div key={job.id} className={`${styles.adminCard} ${styles.hover}`}>
                <h5>{job.id}</h5>
                <h3>{job.title}</h3>
                <p><span>📺 Status:</span>{job.status === true ? '🟢 On' : '🔴 Off'}</p>
                <p><span>🏗 Hergestellt in:</span>{formatDate(job.postedDate)}</p>
            </div>
            <div className={styles.adminCardCommentArea}>
                <textarea placeholder="etwas über dem Job sagen" value={jobComments} onChange={e => setJobComments(e.target.value)} />
                <div>
                    <a onClick={() => submitComments()}>📀 Speichern</a>
                    <a onClick={() => !jobComments ? setJobComments('') : setJobComments(job.comments)}>🪦 Abbrechen</a>
                    <button onClick={() => setIsPopupVisible(true)}>🗑 Job löschen</button>
                </div>
            </div>
            {!isPopupVisible ? '' : (
                <div className={styles.deleteCandidatePopup}>
                    <p>Wenn Sie die Stelle löschen, werden auch alle Bewerber für diese Stelle gelöscht.</p>
                    <p>Möchten Sie fortfahren??</p>
                    <p>Job: <strong>{job.title}</strong></p>
                    <div>
                        <button className={styles.btnSecondary} onClick={() => handleDeleteJobOnClick()}>Ja</button>
                        <button className={styles.btnPrimary} onClick={() => setIsPopupVisible(false)}>Nein</button>
                    </div>
                </div>
            )}
        </>
    )
}