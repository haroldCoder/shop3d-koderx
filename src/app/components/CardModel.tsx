import React, { useState } from 'react'
import { Models} from '../types'
import CardMaximize from './CardMaximize';
import CanvasComponent from './CanvaComponent';

export default function CardModel(data: Models) {
    
  return (
    <>
        <div onClick={()=>{location.href = `/models3d/${data.Id}`}} className='bg-gray-900 w-[30%] flex flex-col gap-y-10 cursor-pointer p-8 rounded-md border-[1.5px] border-green-500 hover:bg-gradient-to-tr to-green-600 from-gray-700'>
            <section className='model3d'>
                <CanvasComponent width='100%' height='50vh' model={data.model?.modeluri} />
            </section>
            <section className='info'>
                <div className='flex justify-between items-center mb-6'>
                <h1 className='text-white text-3xl font-semibold'>{data.name}</h1> 
                <p className='text-xl text-gray-300'>$ {data.price}</p>
                </div>
                <p className='text-gray-400 text-md'>{data.description}</p>
            </section>
            <footer className='sticky top-[100%]'>
                <button className='bg-gray-500 w-[100%] hover:bg-green-500 rounded-md p-3 text-white'>Buy</button>
            </footer>
        </div>
    </>
  )
}
