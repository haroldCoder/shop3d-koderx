"use client"
import uploadToCloudinary from '@/app/services/UploadCloudinary';
import { PresentationControls, Stage } from '@react-three/drei';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Canvas } from 'react-three-fiber';
import Model3dMake from './Model3dMake';
import { useUser } from '@clerk/nextjs';

export default function CreateModel() {
  const [modeluri, setModeluri] = useState<string>("");
  const [data, setData] = useState({
    "name": "",
    "description": "",
    "price": "",
    "Iduser": 0
  })
  const {user} = useUser();

  useEffect(() => {
    const getId = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/${user?.fullName}/${user?.phoneNumbers[0].phoneNumber}?username=${process.env.NEXT_PUBLIC_AUTH_API}`
        );

        setData((dt) => ({
          ...dt,
          Iduser: res.data.id
        }));
      } catch (error) {
        console.error('Error al obtener el ID del usuario:', error);
      }
    };

    if (user) {
      getId();
    }
  }, [user]);
  
  

  const handleFileChange = async(event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/models/lastid?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
    .then(async(result)=>{
      setModeluri(await uploadToCloudinary(await convertFileToBase64(file), result.data.lastid.lastid+1));
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Error al convertir el archivo a Base64.'));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('Iduser', data.Iduser.toString());
    formData.append('price', data.price);
    formData.append("modeluri", modeluri);
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/models?username=${process.env.NEXT_PUBLIC_AUTH_API}`, formData)
  };
  return (
    <div className='flex flex-col flex-wrap w-[100%] items-center py-12 justify-center'>
      <form action="" onSubmit={handleSubmit} className='flex flex-col w-[40%] gap-y-16'>
        <input onChange={handleFileChange} type="file" className="border border-gray-300 p-2" />
        {
          modeluri != "" ?
            <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ width: "100%", height: "50vh", marginTop: "3%", position: "sticky", left: "60%" }}>
              <color attach="background" args={["#000"]} />
              <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
                <Stage environment={"sunset"}>
                  <Model3dMake model={modeluri} />
                </Stage>
              </PresentationControls>
            </Canvas>
            : null
        }
        <input type="text" placeholder='Name of product' onChange={(e)=>{
          setData((data)=>({
            ...data,
            name: e.target.value
          }))
        }} className='text-white border-b-[1.5px] border-green-400 hover:bg-gray-800 bg-black p-4 rounded-md' />
        <input type="text" placeholder='Description' onChange={(e)=>{
          setData((data)=>({
            ...data,
            description: e.target.value
          }))
        }} className='text-white border-b-[1.5px] border-green-400 hover:bg-gray-800 bg-black p-4 rounded-md' />
        <input type="number" placeholder='Price' onChange={(e)=>{
          setData((data)=>({
            ...data,
            price: e.target.value
          }))
        }} className='text-white border-b-[1.5px] border-green-400 hover:bg-gray-800 bg-black p-4 rounded-md' />
        <button type="submit" className="bg-green-500 font-semibold text-white p-2 rounded">Submit</button>
      </form>
    </div>
  )
}
