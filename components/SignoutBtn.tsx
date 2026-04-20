"use client"


import { signOut } from '@/actions/Auth'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const Button = ({children}: Readonly<{children: React.ReactNode}>) => {

  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/signin')
    } catch (error) {
      toast("An Error Occured")
    }
  }


  return (
    <button onClick={()=>handleSignOut()}>{children}</button>
  )
}

export default Button