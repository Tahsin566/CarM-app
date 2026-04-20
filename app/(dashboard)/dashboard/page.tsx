import { getAvailableCars, getCars, getFeaturedCars, getSoldCars, getUnFeaturedCars } from '@/actions/Cars'
import DropDown from '@/components/DropDown'
import Select from '@/components/Select'
import Separator from '@/components/Separator'
import Link from 'next/link'
import React from 'react'


type CarType = {
  name: string; id: string; image: string; price: number; desc: string; brand: string; model: string; year: number; manufacturer: string; status: string; color: string; type: string; engine: string; fuel: string; transmission: string; isFeatured: boolean; date_of_entry: Date;
}

const page = async({searchParams}:{searchParams:{filter:string}}) => {

  const {filter} = await searchParams

  let cars:CarType[] = []

  switch (filter) {
    case "all":
      cars = await getCars() || []
      break;
    case "featured":
      cars = await getFeaturedCars() || []
      break;
    case "unfeatured":
      cars = await getUnFeaturedCars() || []
      break;
    case "sold":
      cars = await getSoldCars() || []
      break;
    case "available":
      cars = await getAvailableCars() || []
      break;
    default:
      cars = await getCars() || []
      break;
  }

  return (
    <div className='p-2'>
      <h1 className='text-3xl font-extrabold py-5 text-center'>Manage Your Cars Here</h1>

      <div className='flex items-center justify-between'>
        <Link className='text-center text-white block cursor-pointer p-2 bg-slate-900 border border-slate-500 rounded-md w-30' href="/dashboard/vehicle/add">Add New Car</Link>
        <Select cars={cars} arr={["all", "featured", "unfeatured","sold","available"]} />
      </div>

      <Separator height="h-5" />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          cars.map((car)=>(
            <div  key={car.id} className='shadow-md p-1 text-left hover:shadow-xl hover:shadow-slate-200 transition-all rounded-xl bg-white/5'>

              <div className='relative'>
                <div className='absolute top-2 left-2 bg-slate-700 text-white p-1 rounded-md'>{car.isFeatured ? "Featured" : "Not Featured"}</div>
                <DropDown id={car.id} feature_status={car.isFeatured} status={car.status}/>
                <Link href={`/cars/${car.id}?user=admin`}>
              <img src={car.image} alt="" className='w-full h-60 object-cover rounded-md' />
                </Link>
              </div>
              <div className='flex flex-wrap justify-between items-center pt-2'>
              <h1>{car.name}</h1>
              <p className={` text-sm font-semibold p-1 rounded-md  shadow-xs ${car.status === "Available" ? "text-green-600 shadow-green-400" : "text-red-600 shadow-red-400 w-15 text-center"}`}>{car.status === "Available" ? "Available" : "Sold"}</p>
              </div>
              <p>{car.price}</p>
              

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default page