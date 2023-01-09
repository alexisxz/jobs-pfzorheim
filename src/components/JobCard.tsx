/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { useState } from 'react'
import { formatDate } from '../helpers/formatDate'
import styles from '../styles/Home.module.scss'
import { Candidate } from '../types/Candidate'
import { Job } from '../types/Job'

type Props = {
    job: Job
}

function JobCard({ job }: Props) {
    const isPartner: boolean = job.company.partner
    const [isExtended, setIsExtended] = useState<string>('none')
    const [appliedCandidate, setAppliedCandidate] = useState<Candidate>({ name: '', email: '', surname: '', phone: '', attachment: '' })

    //handler
    const handleExtendOnClick = () => {
        if (isExtended === 'none') return setIsExtended('')
        return setIsExtended('none')
    }

    const handleCandidateOnChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        setAppliedCandidate({ ...appliedCandidate, [event.currentTarget.name]: event.currentTarget.value })
        console.log(appliedCandidate)
    }

    return (
        <div className={styles.jobCard}>
            <div className={`${styles.jobCardInfos} ${isPartner ? styles.partnerCompany : ''}`}>
                <div className={styles.jobCardTitle} onClick={handleExtendOnClick}>
                    <a><h2>{job.title}</h2></a>
                    {isExtended === 'none' ? <h5>{job.company.name} ↓</h5> : <h5>{job.company.name} ↑</h5>}
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
                        <a href={`#${job.title + job.company + job.location}`} style={{ color: '#fff' }}><button className={styles.btnPrimary}>Jetzt bewerben</button></a>
                    </div>
                </div>
                <div className={styles.jobTopics} style={{ marginTop: '1rem' }}>
                    <p>{job.shortDescription}</p>
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
                <div className={styles.applyJobForm} id={job.title + job.company + job.location}>
                    <h4 style={{ fontWeight: 600 }}> Jetzt bewerben</h4>
                    <form action="https://formsubmit.co/faf324c9c5baeb920124737601280b10" method="POST" encType="multipart/form-data">
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className={styles.applyField}>
                                <label>Vorname</label>
                                <input type="text" name='name' value={appliedCandidate.name} onChange={event => handleCandidateOnChange(event)} required />
                            </div>
                            <div className={styles.applyField}>
                                <label>Name</label>
                                <input type="text" name='surname' value={appliedCandidate.surname} onChange={event => handleCandidateOnChange(event)} required />
                            </div>
                        </div>
                        <div className={styles.applyField}>
                            <label>Email</label>
                            <input type="email" name='email' value={appliedCandidate.email} onChange={event => handleCandidateOnChange(event)} required />
                            {job.emailsApplied?.find(email => email === appliedCandidate.email) ? <code style={{ color: 'red' }}>This email already applied for this job</code> : ''}
                        </div>
                        <div className={styles.applyField}>
                            <label>Kontakt-Telefon</label>
                            <input type="tel" name='phone' value={appliedCandidate.phone} onChange={event => handleCandidateOnChange(event)} required />
                        </div>
                        <div className={styles.applyField}>
                            <label>Lebenslauf (.pdf)</label>
                            <input type="file" accept="application/pdf" name='attachment' value={appliedCandidate.attachment} onChange={event => handleCandidateOnChange(event)} required />
                        </div>
                        <div>
                            {!appliedCandidate.email || !appliedCandidate.name || !appliedCandidate.surname || !appliedCandidate.phone || !appliedCandidate.attachment ? <p style={{ margin: '1rem 0' }}>Ich brauche alle Informationen 🥸</p> : <p style={{ margin: '1rem 0' }}>Perfekt 😎</p>}
                            <button type='submit' className={styles.btnPrimary}>Weiter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JobCard