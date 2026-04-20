"use client"

import { useState } from "react"

const useFetch = (cb:Function,type:any) =>{

    const [data,setData] = useState<undefined>(undefined)
    const [loading, setLoading] = useState<boolean | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fn = async (...args:any) =>{

        setLoading(true);
        setError(null)    

        try {
            const response = await cb(...args);
            setData(response)
            setError(null);
        } catch (error) {
            if(error instanceof Error){
                setError(error.message);
            }
        }

    }

    return {data,loading,error,fn,setData}
    
}

export default useFetch