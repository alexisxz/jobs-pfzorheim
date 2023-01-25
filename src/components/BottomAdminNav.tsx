import React from 'react'
import Link from 'next/link'
import styles from '../styles/Admin.module.scss'

type Props = {}

export default function BottomAdminNav({ }: Props) {
    return (
        <div className={styles.bottomNav}>
            <div className={styles.navLink}>
                <ul>
                    <Link href={"/admin"}><span>🧳</span><p>Jobs</p></Link>
                    <Link href={"/admin/bewerberinnen"}><span>👷‍♀️</span><p>Bewerberinnen</p></Link>
                </ul>
            </div>
        </div>
    )
}