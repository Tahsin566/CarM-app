"use client"

import { Camera, CloudUpload, FileUp, Search, SearchIcon } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-center items-center bg-linear-to-r from-slate-700 to-slate-800 text-white p-4 min-h-80 rounded-b-2xl'>
        <div className='flex flex-col gap-4 items-center'>
        <h1 className='text-4xl font-extrabold text-center'>Find The Dream Car with CarM</h1>
        <p className='text-center text-neutral-400'>Advanced AI integrated search and test drive and more from thousands of cars</p>

        <div className='w-[90vw] relative border bg-white border-slate-600 p-3 rounded-full text-black'>
        <input className='w-full px-3 py-1 outline-0' type="text" name="" id="" placeholder='Search Cars' />
        <SearchIcon onClick={() => console.log("clicked")} className='absolute right-2 cursor-pointer top-2 border border-slate-600 p-2 rounded-full' size={40} />
        <Camera onClick={()=>alert("clicked")} className='absolute right-14 cursor-pointer top-2 border border-slate-600 p-2 rounded-full' size={40} />
        
        </div>

        </div>
    </div>
  )
}

export default Header