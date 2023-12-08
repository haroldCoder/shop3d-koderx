"use client"

import { Models } from '@/app/types'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CardMaximize from '@/app/components/CardMaximize'
 
export default function Page() {
  const {Id} = useParams()
  const [model, setModel] = useState<Models>({
    name: "",
    description: "",
    Iduser: 0,
    price: 0
  })

  useEffect(()=>{
    const getModel = async() =>{
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/model/${Id}?username=${process.env.NEXT_PUBLIC_AUTH_API}`)
      setModel(res.data);
    }
    getModel()
  }, [])  
  
  
  return (
    <>
    {
      model.model?.modeluri ?
        <CardMaximize Id={model.Id} name={model.name} model={model.model?.modeluri!} description={model.description} price={model.price} Iduser={model.Iduser} />
        : null
      }
    </>
  )
  
} 