"use client"
import React, { useEffect } from 'react'
import styles from '../Loader.module.css';
import { useUser } from "@clerk/nextjs"
import usersSocket from '../services/users_sockets';

export default function Signdb() {
    const { user, isLoaded } = useUser();
    const websocket2 = new usersSocket();
    if (isLoaded) {
        websocket2.VerifiUserExist({
            "name": user?.fullName!,
            "email": user?.emailAddresses[0].emailAddress!,
            "cell": user?.phoneNumbers[0]?.phoneNumber! || "0",
        })
    }

    return (
        <div className='flex flex-wrap flex-col items-center justify-center'>
            <h1 className='my-10 text-white text-3xl'>Loading Checked User...</h1>
            <div className={styles.loader}>
                <div className={styles.spinner}></div>
            </div>
        </div>

    )
}
