"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const MobileHam = () => {

    const [isOpen, setIsOpen] = React.useState(false)

    const route = useRouter()

  return (
    <div>
        <div className='md:hidden cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
        </div>

        {isOpen && (
            <div className='flex flex-col gap-4 absolute h-screen top-16 bg-white right-0 z-30 w-20 py-4 md:hidden lg:hidden border border-slate-600 rounded'>
                <button onClick={() => route.push("/")} className='cursor-pointer'>Home</button>
                <button onClick={() => route.push("/about")} className='cursor-pointer'>About</button>
                <button onClick={() => route.push("/signin")} className='cursor-pointer'>Login</button>
            </div>
        )}
    </div>
  )
}

export default MobileHam