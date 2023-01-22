/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import styles from '../styles/Home.module.scss'
import { E164Number } from 'libphonenumber-js/types'
import { formatDate } from '../helpers/formatDate'
import { Job } from '../types/Job'
import { Company } from '../types/Company'
import { database, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { Candidate } from '../types/Candidate'

type Props = {
    job: Job,
    companies: Company[],
    candidates: Candidate[]
}

function JobCard({ job, companies, candidates }: Props) {
    const jobsDatabaseRef = collection(database, "jobs")
    const candidatesDatabaseRef = collection(database, "candidates")

    const isPartner: boolean = true
    const jobCompany: Company | undefined = companies.find(company => company.id === job.companyId)
    const jobCandidates: Candidate[] = candidates.filter(candidate => candidate.jobId === job.id)

    const [cvUrl, setCvUrl] = useState<string>('')
    const [isExtended, setIsExtended] = useState<string>('none')
    const [candidateNumber, setCandidateNumber] = useState<E164Number | undefined>()
    const [appliedCandidate, setAppliedCandidate] = useState<Candidate>({ name: '', email: '', surname: '', phone: '', attachment: null, jobId: job.id, companyId: job.companyId })

    useEffect(() => {
        if (!candidateNumber) return

        const phoneNumber = candidateNumber.toString()
        setAppliedCandidate({ ...appliedCandidate, phone: phoneNumber })
    }, [appliedCandidate, candidateNumber])

    //handler
    const handleExtendOnClick = () => {
        if (isExtended === 'none') return setIsExtended('')
        return setIsExtended('none')
    }

    const handleCandidateOnChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        setAppliedCandidate({ ...appliedCandidate, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleAttachment = (e: any) => {
        if (e.target.files[0]) {
            setAppliedCandidate({...appliedCandidate, attachment: e.target.files[0]})
        }
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(jobCandidates.find(candidate => candidate.email === appliedCandidate.email)) return alert('Email already applied')

        if(!appliedCandidate.attachment) return
        const attachmentRef = ref(storage, `cvs/${appliedCandidate.attachment.name}`)
        uploadBytes(attachmentRef, appliedCandidate.attachment)
            .then(() => {
                getDownloadURL(attachmentRef)
                    .then(async (url) => {
                        await addDoc(candidatesDatabaseRef, {
                            name: appliedCandidate.name,
                            surname: appliedCandidate.surname,
                            phone: appliedCandidate.phone,
                            attachment: url,
                            email: appliedCandidate.email,
                            jobId: appliedCandidate.jobId,
                            companyId: appliedCandidate.companyId,
                        })
                    })
                    .catch((error) => {
                        console.log(error.message)
                    })
            })
            .catch((error) => {
                console.log(error.message)
            })
        setAppliedCandidate({name: '', email: '', surname: '', phone: '', attachment: null, jobId: job.id, companyId: job.companyId})
    }

    return (
        <div className={styles.jobCard}>
            <div className={`${styles.jobCardInfos} ${isPartner ? styles.partnerCompany : ''}`}>
                <div className={styles.jobCardTitle} onClick={handleExtendOnClick}>
                    <a><h2>{job.title}</h2></a>
                    {isExtended === 'none' ? <h5>{jobCompany?.name} ↓</h5> : <h5>{jobCompany?.name} ↑</h5>}
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
                            <h4>{jobCompany?.name} is hiring</h4>
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
                                <h4>{jobCompany?.name}</h4>
                            </div>
                        </div>
                    </div>
                    <div className={styles.companyInfos}>
                        <img alt={jobCompany?.name} src={jobCompany?.image} />
                        <h3>{jobCompany?.name}</h3>
                        <h5>Partner ✅</h5>
                        <div className={styles.copyJobIdClipboard}>
                            <button onClick={() => { navigator.clipboard.writeText(job.id) }}>JobID kopieren</button>
                            <input value={job.id} />
                        </div>
                        <a href={`#${job.id}`} style={{ color: '#fff' }}><button className={styles.btnPrimary}>Jetzt bewerben</button></a>
                    </div>
                </div>
                <div className={styles.jobTopics} style={{ marginTop: '1rem' }}>
                    <p>{job.shortDescription}</p>
                </div>
                <div className={styles.jobTopics}>
                    <h4>Ihre Aufgaben:</h4>
                    <ul>
                        {job.tasks.map((task, index) => (<li key={index}>{task}</li>))}
                    </ul>
                </div>
                <div className={styles.jobTopics}>
                    <h4>Sie bieten:</h4>
                    <ul>
                        {job.profile.map((profile, index) => (<li key={index}>{profile}</li>))}
                    </ul>
                </div>
                <div className={styles.jobTopics}>
                    <h4>Wir bieten:</h4>
                    <ul>
                        {job.benefits.map((benefit, index) => (<li key={index}>{benefit}</li>))}
                    </ul>
                </div>
                <div className={styles.applyJobForm} id={job.id}>
                    <h4 style={{ fontWeight: 600 }}> Jetzt bewerben</h4>
                    <form onSubmit={handleOnSubmit}>
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
                            {jobCandidates.find(candidate => candidate.email === appliedCandidate.email) ? <code style={{ color: 'red' }}>This email already applied for this job</code> : ''}
                        </div>
                        <div className={styles.applyField}>
                            <label>Kontakt-Telefon</label>
                            <PhoneInput name='phone' value={appliedCandidate.phone} onChange={setCandidateNumber} required />
                        </div>
                        <div className={styles.applyField}>
                            <label>Lebenslauf (.pdf)</label>
                            <input type="file" accept="application/pdf" name='attachment' onChange={handleAttachment} required />
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