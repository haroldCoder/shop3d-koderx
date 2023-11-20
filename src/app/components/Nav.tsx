import React from 'react'
import { SignUpButton, UserButton, useAuth } from '@clerk/nextjs';

export default function Nav() {
    const {isSignedIn} = useAuth();

    return (
        <div className='p-8 pb-5 flex justify-between mx-3 border-gradient'>
            <div className='w-[50%] items-center justify-between flex'>
                <section className='pr-10  border-r-[1px] border-gray-400'>
                    <h2 className='text-white text-2xl'>Shop 3D</h2>
                </section>
                <section className='flex items-center justify-between gap-x-12'>
                    <h4 className='text-gray-400 hover:text-green-500 cursor-pointer'>Home</h4>
                    <h4 className='text-gray-400 hover:text-green-500 cursor-pointer'>Services</h4>
                    <h4 className='text-gray-400 hover:text-green-500 cursor-pointer'>About</h4>
                    <h4 className='text-gray-400 hover:text-green-500 cursor-pointer'>Enterprise</h4>
                    <h4 className='text-gray-400 hover:text-green-500 cursor-pointer'>Projects</h4>
                </section>
            </div>
            <div>
                {
                    isSignedIn ? <UserButton afterSignOutUrl='/' /> : 
                    <button className='text-green-500'><SignUpButton>Sign In</SignUpButton></button>
                }
            </div>
        </div>
    )
}
