"use client"
import React, { useEffect, useState } from 'react'
import { Models } from '../types'
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { Canvas } from 'react-three-fiber';
import { PresentationControls, Stage } from '@react-three/drei';
import Model3dMake from './Model3dMake';
import Nav from './Nav';
import toast from 'react-hot-toast';

export default function Carshop() {
  const [data, setData] = useState<Models[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const getCarshop = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${user?.fullName}/${user?.phoneNumbers[0].phoneNumber}?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
        .then(async (resid) => {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/carshop/${resid.data.id}$?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
          setData(res.data);
        })

    }
    if (user) {
      getCarshop();
    }
  }, [user])
  console.log(data);


  const RemoveModel = (iduser: number, idmodel: number) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/carshop/exist/${iduser}/${idmodel}?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
      .then((res) => {
        toast.success(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const payModel = async (iduser: number, price: number, name: string) => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${iduser}?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
      .then(async (res) => {
        await axios.post(`https://stripe-node-microservice.vercel.app/api/stripe`, {
          api_key_stripe: res.data.key_stripe,
          mode: "payment",
          price: price,
          quantity: 1,
          currency: 'usd',
          name: name,
          success_url: `https://info-compiler.netlify.app/?email=${res.data.email}`,
          cancel_url: location.href
        }).then((res) => location.href = res.data)
          .catch((err) => console.log(err))
      })

  }

  return (
    <>
      <Nav />
      <div className='p-5 flex flex-col gap-y-12'>
        {
          data.map((dt) => (
            <div className='bg-white flex justify-between p-2 hover:bg-gray-400 w-[50%] h-[10vh] rounded-md'>
              <section className='flex gap-x-8 w-[40%]'>
                <div className='w-[30%]'>
                  <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} className='rounded-md' style={{ marginTop: "3%" }}>
                    <color attach="background" args={["#000"]} />
                    <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
                      <Stage environment={"sunset"}>
                        <Model3dMake model={dt.model?.modeluri} />
                      </Stage>
                    </PresentationControls>
                  </Canvas>
                </div>
                <div className='p-1'>
                  <h4 className='text-gray-500 text-2xl font-semibold'>{dt.name}</h4>
                  <h4 className='text-green-500'>${dt.price}</h4>
                </div>
              </section>
              <div className='flex justify-between gap-x-6 w-[40%]'>
                <button className='p-2 w-[50%] bg-green-500 hover:bg-black rounded-md text-white' onClick={() => payModel(dt.Iduser, dt.price, dt.name)}>Buy</button>
                <button className='p-2 w-[50%] bg-red-500 hover:bg-black rounded-md text-white' onClick={() => RemoveModel(dt.Iduser, dt.Id!)}>Cancel</button>
              </div>
            </div>
          ))

        }
      </div>
    </>
  )
}
