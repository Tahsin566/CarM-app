"use client"

import Link from 'next/link'
import React from 'react'
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { signUp } from '@/actions/Auth'
import { toast } from 'sonner'

const page = () => {

  const [FormData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const router = useRouter()
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    try {
      await signUp(FormData.email,FormData.password)
      router.push('/')
    } catch (error) {
      toast("An Error Occured")
    }
    finally {
      setIsSubmitting(false)
    }


  }


  return (
    <motion.div initial={{opacity:0,y:15}} transition={{duration:0.5}} animate={{opacity:1,y:0}} className='min-h-[90vh] flex flex-wrap justify-center items-center z-10'>
    <div className='w-125 min-h-100 bg-white/3 rounded-md border border-slate-600 backdrop-blur-md p-4'>

    <h1 className='text-center p-2 text-2xl font-semibold'>Sign Up</h1>

    <div className='h-10'></div>


    <div className=''>
        <input className='w-full border  border-slate-600 p-3 rounded-md' type="text" name="" id=""  placeholder='Enter Your Name' onChange={(e) => setFormData({...FormData, name: e.target.value})}/>
    </div>

    <div className='h-4'></div>

    <div className=''>
        <input className='w-full border border-slate-600 p-3 rounded-md' type="text" name="" id="" placeholder='Enter Your Email' onChange={(e) => setFormData({...FormData, email: e.target.value})} />
    </div>
    <div className='h-4'></div>

    <div className=''>
        <input className='w-full border border-slate-600 p-3 rounded-md' type="password" name="" placeholder='Enter Your Password' security='true' id="" onChange={(e) => setFormData({...FormData, password: e.target.value})} />
    </div>
    <div className='h-4'></div>

    <div className=''>
        <input className='w-full  border border-slate-600 p-3 rounded-md' type="password" placeholder='Confirm Your Password' security='true' name="" id="" />
    </div>

    <div className='h-8'></div>

    <div className='md:w-80 lg:w-80 w-50 mx-auto flex flex-wrap justify-center'>
        <button onClick={handleSubmit} className='w-full cursor-pointer text-white  border border-slate-600 p-3 rounded-md bg-slate-700'>{isSubmitting ? "Signing Up..." : "Sign Up"}</button>
    </div>

    <span className='text-center block mt-4'>Have an account? <Link className='text-blue-500' href="/signin">Sign In</Link></span>

    </div>
</motion.div>
  )
}

export default page