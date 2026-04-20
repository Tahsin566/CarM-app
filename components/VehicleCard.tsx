
import { Dot } from 'lucide-react'
import Link from 'next/link'
import { title } from 'process'
import React from 'react'

const VehicleCard = ({ cars }: { cars: { id: string, name: string, price: number, image: string, year: number, type: string, fuel: string } }) => {

  return (
    <Link href={{
      pathname: `/cars/${cars.id}`
    }} className='grid gap-2 shadow-md p-1 text-left hover:shadow-xl hover:shadow-slate-200 transition-all rounded-xl bg-white/5 cursor-pointer'>

      <div className='mx-auto w-full flex justify-center items-center'>
        <img src={cars.image} alt="" className='w-full h-60 rounded-md' />
      </div>

      {/* <div className='p-1'> */}
        <h3 className='font-bold block text-lg'>{cars.name}</h3>
        <p className='text-blue-500 font-bold'>${cars.price}</p>
        <div className='grid grid-cols-2 mt-2 md:grid-cols-[auto_auto_auto] justify-between lg:grid-cols-[auto_auto_auto] gap-2 text-[12px] font-bold'>
          <div className='shadow-sm p-2 rounded-lg'>{cars.year}</div>
          <div className='shadow-sm p-2 rounded-lg'>{cars.type}</div>
          <div className='shadow-sm p-2 rounded-lg'>{cars.fuel}</div>
        </div>
      {/* </div> */}
        <Link href={`/cars/${cars.id}`} className='text-center text-white block cursor-pointer p-2 bg-slate-900 border border-slate-500 rounded-lg w-full mt-3'>View Details</Link>


    </Link>

  )
}

export default VehicleCard