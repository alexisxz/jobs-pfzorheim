import { reauthenticateWithPopup, signInWithEmailAndPassword, signOut, updatePassword, updateProfile } from 'firebase/auth'
import { collection, doc, documentId, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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

    const [greetings, setGreetings] = useState<string>()
    const [isGreetingsUpdated, setIsGreetingsUpdate] = useState<boolean>(false)

    const [oldPassword, setOldPassword] = useState<string>()

    const [newPassword, setNewPassword] = useState<string>()
    const [newPasswordConfirmed, setNewPasswordConfirmed] = useState<string>()

    const [isNewPasswordUpdated, setIsNewPasswordUpdated] = useState<boolean>(false)
    const [isPasswordLenght, setIsPasswordLenght] = useState<boolean>(true)

    useEffect(() => {
        isUserLogged()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!user) return
        setGreetings(user.greetings)
    }, [user])


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

    // handles
    const handleChangeProfileOnClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!greetings) return setGreetings(user.greetings)
        setIsGreetingsUpdate(false)

        auth.onAuthStateChanged(async (authUser) => {
            if (!authUser) return route.replace("/admin/login")

            const userRef = doc(database, "users", authUser.uid)

            await updateDoc(userRef, {
                greetings: greetings
            })
                .then(() => { setIsGreetingsUpdate(true) })
        })
    }

    const handleChangePasswordOnClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsNewPasswordUpdated(false)
        setIsPasswordLenght(true)

        auth.onAuthStateChanged(async (authUser) => {
            if (!authUser) return route.replace("/admin/login")

            if (newPassword !== newPasswordConfirmed) return

            if (!newPasswordConfirmed) return

            if (newPasswordConfirmed.length <= 5) return setIsPasswordLenght(false)

            updatePassword(authUser, newPasswordConfirmed)
                .then(() => {
                    alert("Bitte verwenden Sie Ihr neues Passwort")
                    signOut(auth)
                    route.reload()
                })
                .catch(() => {
                })


            setOldPassword("")
            setNewPassword("")
            setNewPasswordConfirmed("")
            setIsNewPasswordUpdated(true)
        })
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
                <section className={`${styles.section}`}>
                    <div className={`${styles.container} ${styles.profileContainer}`}>
                        <form className={styles.updateWrapper} onSubmit={handleChangeProfileOnClick}>
                            <label>🧐 Profilname</label>
                            <input type="text" value={greetings} onChange={e => setGreetings(e.target.value)} required />
                            <button className={styles.btnPrimary} >Weiter</button>
                            {isGreetingsUpdated ? (<span style={{ fontSize: 10, color: 'green' }}>das Profil wurde aktualisiert</span>) : ''}
                        </form>

                        <form className={styles.updateWrapper} onSubmit={handleChangePasswordOnClick}>
                            <label>🔑 Passwort</label>
                            {/* <input type="password" placeholder='Altes Passwort' value={oldPassword} onChange={e => setOldPassword(e.target.value)} required /> */}
                            <input type="password" placeholder='Neues Passwort' value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                            {!isPasswordLenght ? (<span style={{ fontSize: 10, color: 'red' }}>Das Passwort sollte mindestens 6 Zeichen lang sein</span>) : ''}
                            <input type="password" placeholder='Wiederhole das neue Passwort' value={newPasswordConfirmed} onChange={e => setNewPasswordConfirmed(e.target.value)} required />
                            {newPassword && newPassword !== newPasswordConfirmed ? (<span style={{ fontSize: 10, color: 'red' }}>Das News-Passwort stimmt nicht überein</span>) : ''}
                            <button className={styles.btnSecondary}>Weiter</button>
                            {isNewPasswordUpdated ? (<span style={{ fontSize: 10, color: 'green' }}>das Passwort wurde aktualisiert</span>) : ''}
                        </form>
                    </div>
                </section>

                <BottomAdminNav />

            </main>
        </>
    )
}