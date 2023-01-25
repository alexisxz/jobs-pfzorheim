import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import styles from '../../styles/Admin.module.scss'
import StirnerLogo from 'public/stirner-stirner-logo.png'
import { signInWithEmailAndPassword } from 'firebase/auth'

type Props = {}

export default function Login({ }: Props) {
    const route = useRouter()

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [isPasswordWrong, setisPasswordWrong] = useState<boolean>(false)

    useEffect(() => {
        isUserLogged()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // check if the user is logged
    const isUserLogged = async () => {
        await auth.onAuthStateChanged(user => {
            if (user) {
                route.replace("/admin")

            } else {
            }
        })
    }

    // handles
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setisPasswordWrong(false)

        if (!email || !password) return

        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                route.replace("/admin")
            })
            .catch((error) => {
                setisPasswordWrong(true)
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
            <div className={styles.loginSection}>
                <div className={styles.loginWrapper}>
                    <h2>Login</h2>
                    <form onSubmit={handleOnSubmit}>
                        <input type="text" placeholder='📧 Email' required value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder='🔐 Passwort' required value={password} onChange={e => setPassword(e.target.value)} />
                        <button type='submit' className={styles.btnPrimary}>Login</button>
                    </form>
                    <h5>Powered by <strong>stirner/stirner</strong></h5>
                    <Image src={StirnerLogo} alt='Stirner logo' className={styles.stirnerLogo} />
                </div>
                {!isPasswordWrong ? '' : (<span>Falsches Passwort, wenn Sie es zurücksetzen müssen, wenden Sie sich bitte an Ihren Vorgesetzten</span>)}
            </div>
        </>
    )
}