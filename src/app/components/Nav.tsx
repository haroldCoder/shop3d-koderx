import React from 'react'

export default function Nav() {
  return (
    <div className='p-8 flex justify-between w-[50%]'>
        <section className='pr-10 border-r-[1px] border-gray-400'>
            <h2 className='text-white text-2xl'>Shop 3D</h2>
        </section>
        <section className='flex justify-between gap-x-8'>
            <h4 className='text-gray-400 cursor-pointer'>Home</h4>
            <h4 className='text-gray-400 cursor-pointer'>Services</h4>
            <h4 className='text-gray-400 cursor-pointer'>About</h4>
            <h4 className='text-gray-400 cursor-pointer'>Enterprise</h4>
            <h4 className='text-gray-400 cursor-pointer'>Projects</h4>
        </section>
    </div>
  )
}
