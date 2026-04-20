

import { getCurrentUser } from '@/actions/Auth'
import { getCar } from '@/actions/Cars'
import Framer from '@/components/Framer'
import Separator from '@/components/Separator'
import { Box, Cog, Dot, Fuel, MessageCircle, MessageSquare, Road, Signal, VectorSquare } from 'lucide-react'
import { FaToolbox } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import DetailsCard from '@/components/DetailsCard'

type DetailsPropType = {
  id: string,
  user: "admin" | "user",
  fuel: string,
  transmission: string,
  engine: string,
  type: string,
  desc: string

}

const page = async ({ params, searchParams }: { params: { id: string }, searchParams: DetailsPropType }) => {

  const { id } = await params

  const { user } = await searchParams

  const car = await getCar(id) || { name: "", price: "", image: "", fuel: "", transmission: "", engine: "", type: "", desc: "" }

  return (
    <Framer >

      <div className='p-3'>


        <Link href={user === 'admin' ? '/dashboard' : '/'} className='text-center text-white block cursor-pointer p-2 bg-slate-700 border border-slate-500 rounded-3xl w-30'>Back</Link>
        <div className='p-5 grid grid-cols-1 md:grid-cols-2 gap-15'>

          <div className=''>
            <Image src={car.image as string} width={500} height={600} alt="" className='rounded-md w-full' />

            <h1 className='md:py-6.25 py-6.25 text-2xl font-semibold text-center'>{car.name}</h1>

            {/* <div className='hidden md:flex lg:flex'>
            <Separator height="h-16" />
            </div> */}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center gap-3'>
              <button className='shadow-lg rounded-lg p-3 border border-neutral-300 cursor-pointer '>Save</button>
              <button className='shadow-lg rounded-lg p-3 border border-neutral-300 cursor-pointer '>Share</button>
            </div>

          </div>

          {/* second grid container */}

          <div className=''>


            <h1 className='font-bold text-white w-fit bg-slate-800 rounded-lg p-2'>{car.type}</h1>
            <Separator height="h-3" />
            <h1 className='text-xl font-bold'>{car.name}</h1>
            <p className='text-blue-600 font-bold'>${car.price}</p>

            <div className='grid grid-cols-2 items-center md:grid-cols-3 lg:grid-cols-3 gap-3 mt-3'>
              <div className='flex gap-2 rounded-lg min-h-18 items-center p-2 shadow-md'><Road />{'16 mile'}</div>
              <div className='flex gap-2 rounded-lg min-h-18 items-center p-2 shadow-md'><Fuel />{car.fuel}</div>
              <div className='flex gap-2 rounded-lg min-h-18 items-center p-2 shadow-md'><FaToolbox />{car.transmission}</div>
            </div>

            <Separator height="h-3" />

            <div className='grid gap-2 rounded-lg min-h-18 items-center p-3 shadow-md'>
              <div className='flex items-center gap-2'>
                <VectorSquare className='text-blue-500' />
                <h1 className='font-bold'>EMI Calculator</h1>
              </div>
              <p>Estimated monthly payment of {`${(Number(car.price) / 60).toFixed(2)}`} for 60 months</p>
              <p className='text-xs flex gap-2 items-center'><Dot />Based on $0 down payment</p>
            </div>


            <div className='grid gap-2 rounded-lg min-h-18 items-center p-3 shadow-md'>
              <div className='flex items-center gap-2'>
                <MessageSquare className='text-blue-500' />
                <h1 className='font-bold'>Have Questions ?</h1>
              </div>
              <p>Our customer service team is here to answer your questions</p>
              <Link href='/' className='text-center block cursor-pointer p-2 shadow-lg border border-neutral-200 rounded-lg w-full'>Request Info</Link>
            </div>

            <Link href='/' className='mt-2 text-center block cursor-pointer p-2 bg-slate-900 text-white shadow-lg border border-neutral-200 rounded-lg w-full'>Book a Test Drive</Link>

            <Separator height="h-6" />

            

          </div>

        </div>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-10 gap-3'>

      <div className='mt-3'>
        <h1 className='font-bold text-2xl'>Description</h1>
        <Separator height="h-3" />
        <div>{car.desc}</div>
      </div>
      <div className='mt-3'>
        <h1 className='font-bold text-2xl'>Features</h1>
        <Separator height="h-3" />
        <div className='flex items-center gap-3'>
          <Dot /> {car.engine}
        </div>
        <div className='flex items-center gap-3'>
          <Dot /> {car.fuel} based car
        </div>
        <div className='flex items-center gap-3'>
          <Dot /> {car.transmission}
        </div>
        <div className='flex items-center gap-3'>
          <Dot /> {car.engine}
        </div>
      </div>
      
      <DetailsCard car={car} />

      </div>
      <Separator height="h-6" />
    </Framer>
  )
}

export default page