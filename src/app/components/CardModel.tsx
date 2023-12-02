import React, { useState } from 'react'
import { Models} from '../types'
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import dynamic from 'next/dynamic';
import Model3dMake from './Model3dMake';
import CardMaximize from './CardMaximize';

export default function CardModel(data: Models) {
    const [popup, setPopUp] = useState<boolean>(false);
    
  return (
    <>
        <div onClick={()=>{setPopUp(true)}} className='bg-gray-900 w-[30%] flex flex-col gap-y-10 cursor-pointer p-8 rounded-md border-[1.5px] border-green-500 hover:bg-gradient-to-tr to-green-600 from-gray-700'>
            <section className='model3d'>
                <Canvas dpr={[1,2]} shadows camera={{ fov: 45 }} style={{width: "100%", height: "50vh", marginTop: "3%", position: "sticky", left: "60%"}}>
                    <color attach="background" args={["#000"]} />
                    <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
                        <Stage environment={"sunset"}>
                        <Model3dMake model={data.model?.modeluri} />
                        </Stage>
                    </PresentationControls>
                </Canvas>
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
        <div>
                {
                    popup ?
                    <div className='absolute w-[65%] z-10 top-[15%] left-[20%]'>
                        <CardMaximize Id={data.Id} setPopup={setPopUp} name={data.name} model={data.model?.modeluri} description={data.description} price={data.price} Iduser={data.Iduser} />
                    </div>
                    : null
                }
            </div>
    </>
  )
}
