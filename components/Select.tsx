"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'


const Select = ({ arr = [], cars = [] }: { arr: string[], cars: any }) => {

    const [loading, setLoading] = React.useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | undefined = undefined) => {

        setLoading(true)

        try {
            router.push(`/dashboard?filter=${(e?.target.value?.toString() as string).toLowerCase()}`)

        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }


    }

    useEffect(() => {
        router.push('/dashboard?filter=all')
    }, [])



    return (
        <select name='category' onChange={(e) => handleChange(e)} className='block border bg-black text-white rounded-xl p-3 border-[rgba(255,255,255,0.2)] outline-none'>
            {
                arr.map((item, index) => (<option  className='text-white bg-black rounded-md' key={index} value={item}>{item}</option>))
            }
        </select>
        
    )


}

export default Select