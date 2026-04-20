"use client"

import { usePathname } from 'next/navigation'
import React from 'react'

const Footer = () => {

  const pathname = usePathname()
  
  // Define routes where the footer should be hidden
  const hiddenRoutes = ['/signin', '/signup']
  
  if (hiddenRoutes.includes(pathname)) {
    return null
  }

  return (
    <div className='flex justify-between items-center p-4 border-t border-slate-400 z-30'>

    <div className='text-2xl font-extrabold text-slate-700 cursor-pointer'>CarM</div>
    <div>
        {/* give copywrite words to write along with user who built this */}

        Copyright © 2026 CarM. All rights reserved.

    </div>
    </div>
  )
}

export default Footer