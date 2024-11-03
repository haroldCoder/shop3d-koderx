"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Models } from '../types';
import { Canvas } from 'react-three-fiber';
import Model3dMake from './Model3dMake';
import Nav from './Nav';
import { PresentationControls, Stage } from '@react-three/drei';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';

export default function Creations() {
    const { user } = useUser();
    const [data, setData] = useState<Array<Models>>([]);
    const [popup, setPopup] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        const getModels = async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${user?.fullName}/${user?.phoneNumbers[0].phoneNumber}?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
                .then(async (data) => {
                    console.log(data);

                    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/models/user/prop/${data.data.id}?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
                    setData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        if (user) {
            getModels();
        }

    }, [user]);

    const deleteModel = (id: number) =>{
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/model/${id}?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
        .then(()=>{
            toast.success("product remove")
        })
        .catch((err)=>{
            toast.error("an ocurred error")
        })
    }


    return (
        <>
            <Nav />
            <div className='flex flex-wrap gap-y-5 p-4 flex-col items-center'>
                {
                    data && data.map((dt, index) => (
                        <div key={index} className='flex bg-gradient-to-l to-green-500 h-[25vh] from-gray-600 rounded-md p-3 px-8 gap-x-10'>
                            <section>
                                <Canvas>
                                    <color attach="background" args={["#000"]} />
                                    <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
                                        <Stage environment={"sunset"}>
                                            <Model3dMake model={dt.model?.modeluri} />
                                        </Stage>
                                    </PresentationControls>
                                </Canvas>
                            </section>
                            <section className='flex flex-col gap-y-7'>
                                <div>
                                    <h2 className='text-white mb-4 text-2xl font-semibold'>{dt.name}</h2>
                                    <p className='text-gray-400 text-lg'>{dt.description}</p>
                                </div>
                                <div className='flex justify-between px-8'>
                                    <button onClick={()=>{setPopup(true), setId(dt.Id!)}}>
                                        <DeleteIcon style={{fontSize: "40px"}} className='hover:text-red-500 text-white cursor-pointer' />
                                    </button>
                                    <button>
                                        <EditIcon style={{fontSize: "40px"}} className='hover:text-blue-500 text-white cursor-pointer' />
                                    </button>                                    
                                </div>
                            </section>
                        </div>
                    ))
                }
            </div>
            {
                popup ?
                <div className='absolute top-[20%] left-[30%]'>
                    <div className='bg-white opacity-90 rounded-md p-4' style={{backdropFilter: "blur(6px)"}}>
                        <h2 className='text-gray-500 text-2xl'>Are you sure you want to delete this element?</h2>
                        <div className='mt-4 gap-x-10 flex w-100 p-4'>
                            <button onClick={()=>{deleteModel(id)}} className='bg-yellow-500 w-[40%] text-white p-2 rounded-md'>Accept</button>
                            <button onClick={()=>setPopup(false)} className='bg-red-500 w-[50%] text-white p-2 rounded-md'>Cancel</button>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    )
}
