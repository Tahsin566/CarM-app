
import { addCars, getCars, getFeaturedCars } from "@/actions/Cars";
import FaqCard from "@/components/FaqCard";
import Framer from "@/components/Framer";
import Header from "@/components/Header";
import Separator from "@/components/Separator";
import VehicleCard from "@/components/VehicleCard";
import { faq, make } from "@/data";
import useFetch from "@/hooks/cars";
import { createClient } from "@/lib/supabase/server";
import { Calendar, Car, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface CarsType {
  id: string
  name: string
  model: string
  transmission: string
  fuel: string
  engine: string
  type: string
  color: string
  image: string
  status: string
  year: number
  price: number
  desc: string
  brand: string
  manufacturer: string
  isFeatured: boolean,
  date_of_entry: Date
}


export default async function Home() {

  const featureCars = await getFeaturedCars() || []

  const supabase = await createClient()


  return (
    <Framer>

      <Header />

      <div className=" min-h-screen py-2 md:px-20 lg:px-20">

        <div className="flex justify-between py-10">
          <h1 className="text-2xl text-center font-bold">Featured Cars</h1>
          <Link href={"/cars"} className="bg-black text-center cursor-pointer text-white  border border-slate-500 rounded-md w-30 p-2 flex items-center justify-center">View All</Link>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {
            featureCars.map((car: CarsType, index) => index < 3 && <VehicleCard key={car.id} cars={car} />)
          }
        </div>

        <h1 className="py-20 text-2xl text-center font-bold">Browse by Make</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {
            make.map((car) => (
              <div className="p-2 rounded-lg shadow-lg overflow-hidden justify-between flex flex-col items-center">
                <img src={car.image as string} alt="" className='rounded-2xl w-30 h-30 object-contain' />
                <p>{car.name}</p>
              </div>

            ))
          }
        </div>

        <h1 className="py-20 text-2xl text-center font-bold">Why choose us</h1>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-2 flex flex-col items-center shadow-lg hover:shadow-xl transition-all rounded-lg min-h-40 gap-2">
            <h1 className="text-xl font-bold">Wide Selection</h1>
            <div className="bg-blue-200 p-2 rounded-full">
              <Car size={33} className="text-blue-700" />
            </div>
            <p>You can choose from thousands of cars</p>
          </div>
          <div className="p-2 flex flex-col items-center shadow-lg hover:shadow-xl transition-all rounded-lg min-h-40 gap-2">
            <h1 className="text-xl font-bold">Test drive</h1>
            <div className="bg-blue-200 p-2 rounded-full">
              <Calendar size={30} className="text-blue-700" />
            </div>
            <p>Test drive your dream car</p>
          </div>
          <div className="p-2 flex flex-col items-center shadow-lg hover:shadow-xl transition-all rounded-lg min-h-40 gap-2">
            <h1 className="text-xl font-bold">Save your favorites</h1>
            <div className="bg-blue-200 p-2 rounded-full">
              <Heart size={30} className="text-blue-700" />
            </div>
            <p>Save your favorite cars</p>
          </div>


        </div>

        <Separator height="h-3" />

        <h1 className="py-20 text-2xl text-center font-bold">Frequently asked questions</h1>

        <div className="grid gap-2">
          {faq.map((faq, index) => (
            <FaqCard key={index} faq={faq} />
          ))}
        </div>

        <Separator height="h-6" />


      </div>
      <div className="w-full flex flex-col items-center justify-center bg-linear-to-r from-slate-700 to-slate-800 rounded-md min-h-50 text-white">

        <h1 className="text-3xl text-center font-extrabold">Ready to find your dream car ?</h1>
        <p className="text-center py-1 text-neutral-500 pb-3">Choose from thousands of cars and find your dream car</p>

        <Link href="/cars" className="bg-slate-900 text-center cursor-pointer text-white rounded-lg w-40 p-2 flex items-center justify-center">View All</Link>

      </div>
    </Framer>
  );
}
