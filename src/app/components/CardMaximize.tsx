import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { Canvas } from 'react-three-fiber';
import { PresentationControls, Stage } from '@react-three/drei';
import Model3dMake from './Model3dMake';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

const CardMaximize: React.FC<{ Id: number | undefined, name: string; description: string; Iduser: number, model: string | undefined, price: number, setPopup: Dispatch<SetStateAction<boolean>> }> = ({ Id, name, description, Iduser, model, price, setPopup }) => {
    const [userdata, setUserdata] = useState<{ user: string, key_stripe: string }>({
        user: "",
        key_stripe: ""
    });
    const { user } = useUser();

    useEffect(() => {
        const getAuthor = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/model/user/${Iduser}?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
            setUserdata((dt) => ({
                ...dt,
                user: res.data.user,
                key_stripe: res.data.key_stripe
            }));
            console.log(userdata);

        }

        getAuthor();
    }, [])

    const BuyModel = async () => {
        await axios.post(`https://stripe-node-microservice.vercel.app/api/stripe`, {
            api_key_stripe: userdata.key_stripe,
            mode: "payment",
            price: price,
            quantity: 1,
            currency: 'usd',
            name: name,
            success_url: location.href,
            cancel_url: location.href
        }).then((res) => location.href = res.data)
            .catch((err) => console.log(err))
    }

    const Addtocarshop = async () => {
        
        
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${user?.fullName}/${user?.phoneNumbers[0].phoneNumber}?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
            .then(async (res) => {
                console.log(Id);
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/carshop?username=${process.env.NEXT_PUBLIC_AUTH_API}`, {
                    iduser: res.data.id,
                    idmodel: Id
                }).then(()=>{
                    toast.success("model added to car shop!")
                })
                .catch((err)=>{
                    console.log(err);
                    
                })
            })
            .catch((err)=>{
                console.log(err);
                
            })

    }

    return (
        <div className='p-3 w-[100%] bg-[#FFFFFF6F] opacity-90 rounded-md' style={{ backdropFilter: "blur(18px)" }}>
            <div className='head flex border-b-[2px] border-green-600 p-2 justify-between'>
                <h2 className='text-4xl text-white font-bold'>{name}</h2>
                <div onClick={() => { setPopup(false) }}>
                    <CancelIcon className='cursor-pointer text-white hover:text-gray-400 text-xl' />
                </div>
            </div>
            <section className='body flex flex-col justify-start'>
                <div className='w-[100%] flex justify-between mt-[3%] gap-x-2'>
                    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ width: "40%", borderRadius: "15px", height: "60vh" }}>
                        <color attach="background" args={["#000"]} />
                        <PresentationControls speed={1.5} zoom={.5} polar={[-0.1, Math.PI / 4]}>
                            <Stage>
                                <Model3dMake model={model} />
                            </Stage>
                        </PresentationControls>
                    </Canvas>
                    <section className='w-[57%] flex flex-col flex-wrap items-center gap-y-16'>
                        <div className='bg-green-500 p-2 text-white text-4xl font-bold h-[7vh] rounded-md'>
                            $ {price}
                        </div>
                        <div>
                            <h2 className='text-white'>Author: <span className='text-green-500'>{userdata.user}</span></h2>
                        </div>
                        <div className='p-2 bg-black rounded-md w-[100%]'>
                            <h2 className='text-gray-200'>{description}</h2>
                        </div>
                    </section>
                </div>
            </section>
            <section className='pay flex justify-evenly mt-12'>
                <button onClick={Addtocarshop} className='bg-white w-[40%] text-black rounded-md p-4 opacity-100 hover:text-white hover:bg-black'>Add to Car Shop</button>
                <button onClick={BuyModel} className='bg-black w-[40%] text-white rounded-md p-4 opacity-100 hover:bg-green-600'>Pay Now</button>
            </section>
        </div>
    )
}

export default CardMaximize;
