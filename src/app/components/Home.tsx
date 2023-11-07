'use client'
import React, { useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { categories } from '../constants/categories';

export default function Home(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

    const handleCloseMenu = () => {
        setIsMenuOpen(!isMenuOpen); // change state of menu
    }

    return (
        <div>
            <section className={`flex  h-[100vh] w-[16%] text-white`}>
                <div className={`w-[85%] bg-gray-800 p-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <h1 className='text-xl'>Categories</h1>
                    <nav className='mt-5'>
                        {
                            categories.map((ctg, index) => (
                                index < 3 ?
                                <ul key={index} className='my-3'>
                                    <h2 className='text-white text-xl'>{ctg.name}</h2>
                                    {
                                        ctg.items.map((it)=>(
                                           <li key={it} className='text-gray-300 my-2 cursor-pointer px-2 py-1 rounded-md hover:bg-green-600'>
                                                <p className='text-md'>{it}</p>
                                            </li>  
                                        ))
                                    }
                                </ul>
                                : null
                            ))
                        }

                    </nav>
                </div>
                <div className='flex bg-gray-800 items-center w-[15%]'>
                    <button onClick={handleCloseMenu} className="text-lg transition-shadow text-white hover:text-indigo-400">
                        <KeyboardArrowRightIcon className='text-green-600 text-3xl' />
                    </button>
                </div>
            </section>
        </div>
    );
}
