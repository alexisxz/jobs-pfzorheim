/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { useState } from 'react'
import { formatDate } from '../helpers/formatDate'
import styles from '../styles/Home.module.scss'
import { Job } from '../types/Job'

type Props = {
    job: Job
}

function JobCard({ job }: Props) {
    const [isExtended, setIsExtended] = useState<string>('none')

    //handler
    const handleExtendOnClick = () => {
        console.log('worked')
        if (isExtended === 'none') return setIsExtended('')
        return setIsExtended('none')
    }

    return (
        <div className={styles.jobCard}>
            <div className={styles.jobCardInfos}>
                <div className={styles.jobCardTitle} onClick={handleExtendOnClick}>
                    <a>{isExtended === 'none' ? <h2>{job.title} ↓</h2> : <h2>{job.title} ↑</h2>}</a>
                    <h5>{job.company.name}</h5>
                </div>
                <div className={styles.jobCardParagraph}>
                    <h5>Arbeitsbereiche</h5>
                    <h4>{job.field}</h4>
                </div>
                <div className={styles.jobCardParagraph}>
                    <h5>Standort</h5>
                    <h4>{job.location}</h4>
                </div>
                <div className={styles.jobCardParagraph}>
                    <h5>Job veröffentlicht:</h5>
                    <h4>{formatDate(job.postedDate)}</h4>
                </div>
            </div>
            <div className={styles.jobCardExtension} style={{ display: isExtended }}>
                <div className={styles.jobCardExtensionHeading}>
                    <div className={styles.jobCardExtensionHeadingInfos}>
                        <div className={styles.heading}>
                            <h4>{job.company.name} is hiring</h4>
                            <h3>{job.title}</h3>
                        </div>
                        <div className={styles.jobInfos}>
                            <div>
                                <h5>🌎 Standort</h5>
                                <h4>{job.location}</h4>
                            </div>
                            <div>
                                <h5>🧳 Arbeitsbereiche</h5>
                                <h4>{job.field}</h4>
                            </div>
                            <div>
                                <h5>👩‍🎓 Einstieg als</h5>
                                <h4>{job.role}</h4>
                            </div>
                            <div>
                                <h5>🗓 Startdatum</h5>
                                <h4>{!job.startingDate ? (<p>Nach Vereinbarung</p>) : (<p>{formatDate(job.startingDate)}</p>)}</h4>
                            </div>
                            <div>
                                <h5>⏰ Arbeitszeit</h5>
                                <h4>{job.workingTime}</h4>
                            </div>
                            <div>
                                <h5>🏭 Rechtseinheit</h5>
                                <h4>{job.company.name}</h4>
                            </div>
                        </div>
                    </div>
                    <div className={styles.companyInfos}>
                        <img alt={job.company.name} src={job.company.image} />
                        <h3>{job.company.name}</h3>
                        {job.company.partner ? <h5>Partner ✅</h5> : ''}
                        <button className={styles.btnPrimary}>Jetzt bewerben</button>
                    </div>
                </div>
                <div className={styles.jobTopics}>
                    <h4>Ihre Aufgaben:</h4>
                    <ul>
                        {job.tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.jobTopics}>
                    <h4>Sie bieten:</h4>
                    <ul>
                        {job.profile.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.jobTopics}>
                    <h4>Wir bieten:</h4>
                    <ul>
                        {job.benefits.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button className={styles.btnPrimary}>Jetzt bewerben</button>
                </div>
            </div>
        </div>
    )
}

export default JobCard