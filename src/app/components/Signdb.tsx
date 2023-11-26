"use client"
import React, { useEffect } from 'react'
import styles from '../Loader.module.css';
import { useUser } from "@clerk/nextjs"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Signdb() {
    const { user, isLoaded } = useUser();
    if (user) {
        console.log(user);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/verify?username=${process.env.NEXT_PUBLIC_AUTH_API}`, {
            "name": user?.fullName!,
            "email": user?.emailAddresses[0].emailAddress!,
            "cell": user?.phoneNumbers[0]?.phoneNumber! || "0"
        })
            .then((res) => {
                if (res.data.msg) {
                    toast.success("user exist");
                    setInterval(() => {
                        location.href = "/"
                    },1500)
                }
                else {
                    toast.error("user no exist....")
                    location.href = "/signup-user"
                }
            })
    }

    return (
        <div className='flex flex-wrap flex-col items-center justify-center'>
            <h1 className='my-10 text-white text-3xl'>Loading Checked User...</h1>
            <div className={styles.loader}>
                <div className={styles.spinner}></div>
            </div>
            <Toaster />
        </div>

    )
}
