"use client"
import React, { useState } from 'react'
import styles from '../Loader.module.css';
import { useUser } from "@clerk/nextjs"
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Signupdb() {
    const { user } = useUser();
    const [key_stripe, setKeyStripe] = useState<string>("");

    const SendKeyStripe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users?username=${process.env.NEXT_PUBLIC_AUTH_API}`, {
            "name": user?.fullName!,
            "email": user?.emailAddresses[0].emailAddress!,
            "cell": user?.phoneNumbers[0].phoneNumber!,
            "key_stripe": key_stripe
        })
            .then(() => {
                toast.success("User register")
                setInterval(() => {
                    location.href = "/"
                }, 1500)
            })
            .catch((err) => {
                toast.error("User exist or problems with server")
                console.log(err);
            })
    }

    return (
        <div className='flex flex-wrap flex-col items-center justify-center'>
            <h1 className='my-10 text-white text-3xl'>Register User Loading....</h1>
            <form onSubmit={SendKeyStripe} action="">
                <input value={key_stripe} onChange={(key) => { setKeyStripe(key.target.value) }} required type="text" placeholder='Write you stripe key' className='decoration-none outline-none border-b-2 bg-transparent p-2 text-white mb-20 border-green-600 w-full' />
                <button type='submit' className='px-4 py-2 mb-4 bg-green-600 rounded-md text-white w-full hover:bg-green-700 hover:scale-105'>Save Key Stripe</button>
                <p className='text-white ml-3 mb-3'>you not have key stripe <a className='text-green-500 hover:text-green-600' target='blank' href="https://dashboard.stripe.com/apikeys">https://dashboard.stripe.com/apikeys</a></p>
            </form>
            <div className={styles.loader}>
                <div className={styles.spinner}></div>
            </div>
        </div>
    )
}
