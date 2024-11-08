'use client'
import React, { useEffect, useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { categories } from '../constants/categories';
import { Models } from '../types';
import CardModel from './CardModel';
import axios from 'axios';

export default function Home(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
    const [models, setModels] = useState<Array<Models>>([]);

    useEffect(() => {
        const getModels = async() =>{
            const models = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/models?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
            setModels(models.data);
        }

        getModels();
    }, [])
    

    const handleCloseMenu = () => {
        setIsMenuOpen(!isMenuOpen); // change state of menu
    }

    return (
        <div className='flex gap-x-8'>
            <section className={`flex  min-h-[100vh] w-[auto] text-white`}>
                <div className={`w-[85%] bg-gray-800 p-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <h1 className='text-xl'>Categories</h1>
                    <nav className='mt-5'>
                        {
                            categories.map((ctg, index) => (
                                index < 3 ?
                                    <ul key={index} className='my-3'>
                                        <h2 className='text-white text-xl'>{ctg.name}</h2>
                                        {
                                            ctg.items.map((it) => (
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
            <section className='py-4 w-[100%] flex gap-x-10'>
                {
                    models.map((md: Models) => (
                        <CardModel Id={md.Id} key={md.name} name={md.name} description={md.description} price={md.price} model={md.model} Iduser={md.Iduser}  />
                    ))
                }
            </section>
        </div>
    );
}
