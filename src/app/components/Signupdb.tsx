"use client"
import React, { useState } from 'react'
import styles from '../Loader.module.css';
import {useUser} from "@clerk/nextjs"
import usersSocket from '../services/users_sockets';

export default function Signupdb() {
    const {user} = useUser();
    const [key_stripe, setKeyStripe] = useState<string>("");

    const SendKeyStripe = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

         new usersSocket().create({
            "name": user?.fullName!,
            "email": user?.emailAddresses[0].emailAddress!,
            "cell": user?.phoneNumbers[0].phoneNumber!,
            "key_stripe": key_stripe
         }) 
    }

    return (
        <div className='flex flex-wrap flex-col items-center justify-center'>
            <h1 className='my-10 text-white text-3xl'>Register User Loading....</h1>
            <form onSubmit={SendKeyStripe} action="">
                <input value={key_stripe} onChange={(key)=>{setKeyStripe(key.target.value)}} required type="text" placeholder='Write you stripe key' className='decoration-none outline-none border-b-2 bg-transparent p-2 text-white mb-20 border-green-600 w-full' />
                <button type='submit' className='px-4 py-2 mb-4 bg-green-600 rounded-md text-white w-full hover:bg-green-700 hover:scale-105'>Save Key Stripe</button>
                <p className='text-white ml-3 mb-3'>you not have key stripe <a className='text-green-500 hover:text-green-600' target='blank' href="https://dashboard.stripe.com/apikeys">https://dashboard.stripe.com/apikeys</a></p>
            </form>
            <div className={styles.loader}>
                <div className={styles.spinner}></div>
            </div>
        </div>
    )
}
