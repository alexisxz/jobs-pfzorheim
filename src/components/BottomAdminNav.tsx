import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Admin.module.scss'
import { useRouter } from 'next/router'

type Props = {}


export default function BottomAdminNav({ }: Props) {
    const route = useRouter()

    const [active, setActive] = useState()

    const handleOnClick = () => {
        console.log(route.pathname === "/admin")
    }

    return (
        <div className={styles.bottomNav}>
            <div className={styles.navLink}>
                <ul>
                    <Link className={route.pathname === "/admin" ? styles.active : ''} href={"/admin"}><span>🧳</span><p>Jobs</p></Link>
                    <Link className={route.pathname === "/admin/bewerberinnen" ? styles.active : ''} href={"/admin/bewerberinnen"}><span>👷‍♀️</span><p>Bewerberinnen</p></Link>
                </ul>
            </div>
        </div>
    )
}