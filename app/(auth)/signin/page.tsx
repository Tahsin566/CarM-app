"use client"

import Link from 'next/link'
import React from 'react'
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { signIn } from '@/actions/Auth'
import { toast } from 'sonner'


const page = () => {

    const [FormData, setFormData] = React.useState({
        email: "",
        password: ""
    })

    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const router = useRouter()

    const onsubmit = async(e: React.FormEvent) => {

        e.preventDefault()

        setIsSubmitting(true)

        try {
            await signIn(FormData.email,FormData.password)
            router.push('/')
        } catch (error) {
            toast("An Error Occured")
        }
        finally {
            setIsSubmitting(false)
        }


    }

  return (

    <motion.div initial={{opacity:0,y:15}} transition={{duration:0.5}} animate={{opacity:1,y:0}} className='min-h-[90vh] flex flex-wrap justify-center items-center z-20'>
        <div className='w-125 min-h-100 rounded-md border border-slate-600 bg-white/3 backdrop-blur-md p-4'>

        <h1 className='text-center p-2 text-2xl font-semibold'>Sign In</h1>

        <div className='h-10'></div>


        <div className='w-full'>
            <input className='w-full border border-slate-600 p-3 rounded-md' type="text" placeholder='Enter Your Email' name="" id="" onChange={(e) => setFormData({...FormData, email: e.target.value})} />
        </div>
        <div className='h-4'></div>

        <div className='w-full'>
            <input className='w-full border border-slate-600 p-3 rounded-md' type="password" placeholder='Enter Your Password' name="" id="" onChange={(e) => setFormData({...FormData, password: e.target.value})}/>
        </div>

        <div className='h-8'></div>

        <div className=' flex justify-center text-white'>
            <button onClick={(e)=>{onsubmit(e)}} className='md:w-80 lg:w-80 w-50 bg-slate-700 cursor-pointer  border border-slate-600 p-3 rounded-md '>{isSubmitting ? "Signing In..." : "Sign In"}</button>
        </div>

        <span className='text-center block mt-4'>Dont have an account? <Link className='text-blue-500' href="/signup">Sign Up</Link></span>

        </div>
    </motion.div>
  )
}

export default page