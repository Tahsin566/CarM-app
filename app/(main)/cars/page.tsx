import { getCars, getFeaturedCars, getUnFeaturedCars } from '@/actions/Cars'
import VehicleCard from '@/components/VehicleCard'
import React from 'react'

const page = async() => {

  const cars = await getUnFeaturedCars() || []

  

  return (
    <div className='p-8 mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
      {
        cars.map((car)=>(<VehicleCard key={car.id} cars={car} />))
      }
    </div>
  )
}

export default page