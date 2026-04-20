"use client"

import { getCurrentUser } from '@/actions/Auth'
import { addCars, processImageUsingAI, uploadFile } from '@/actions/Cars'
import Separator from '@/components/Separator'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import FileUploadCustom from './Fileupload'
import { models } from '@/data'
import useFetch from '@/hooks/cars'

const AddCarForm = () => {

  const [file, setFile] = React.useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const [model, setModel] = React.useState("gemini-2.5-flash")
  const [tab, setTab] = React.useState(1)


  const router = useRouter()

  const [formData, setFormData] = React.useState({

    name: '',
    model: '',
    color: '',
    transmission: '',
    fuel: '',
    engine: '',
    type: '',
    year: '',
    status: '',
    price: '',
    desc: '',
    brand: '',
    manufacturer: '',
    isFeatured: false

  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {

      const file = e.target.files?.[0]
      console.log(file)

      if (!file) return

      setFile(file)


    } catch (error) {
      console.log(error)
    }
  }

  const {data,loading,error,setData,fn:hello} = useFetch(addCars,2)


  const handleFormSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault()

    if(!file) return toast("Please upload an image before uploading to the portal.");

    try {
      setIsSubmitting(true)
      await hello(formData, file as File)

    } catch (error) {
      console.log(error)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const data = await processImageUsingAI(file as File, model)

      if (!data) return


      setFormData({
        ...formData,
        name: data.name,
        model: data.model,
        color: data.color,
        transmission: data.transmission,
        fuel: data.fuel,
        engine: data.engine,
        type: data.type,
        year: data.year.toString(),
        status: "Available",
        price: Number(data.price).toFixed(2),
        desc: data.desc,
        brand: data.brand,
        manufacturer: data.manufacturer
      })

      toast.success("AI Generated Data Successfully",{style: {
        color: "limegreen"
      }})
    } catch (error) {
      console.log(error)
      if (error instanceof Error){
        toast.error('Could not Generate Data, try a different model', {style: {
          color: "red"
        }})
      }
    }
    finally {
      setIsSubmitting(false)
    }
  
    }

  return (
    true ? <div className='grid grid-cols-[0.6fr] justify-center'>


      <h1 className='text-2xl font-extrabold text-center py-3'>Add New Car</h1>

      <div className='grid grid-cols-2 mt-2'>
        <button onClick={() => setTab(1)} className={`border ${Number(tab) === 1 ? "bg-slate-800 text-white" : ""} border-slate-500 rounded-md p-2`}>
            Manual
        </button>

        <button onClick={() => setTab(2)} className={`border ${Number(tab) === 2 ? "bg-slate-800 text-white" : ""} border-slate-500 rounded-md p-2`}>
            Automatic
        </button>
      </div>


      {/* form data */}
      {tab === 1 && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-1 mt-3 gap-4'>

        <div>
          <label htmlFor="name">Name</label>
          <input className='w-full border rounded-md p-3' type="text" name="" id="" onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder='Name' value={formData.name} />
        </div>
        <div>
          <label htmlFor="model">Model</label>
          <input className='w-full border rounded-md p-3' type="text" name="" id="" onChange={(e) => setFormData({ ...formData, model: e.target.value })} placeholder='Model' value={formData.model} />
        </div>

        <div>
          <label htmlFor="model">Color</label>
          <input className='w-full border rounded-md p-3' type="text" name="" id="" onChange={(e) => setFormData({ ...formData, color: e.target.value })} placeholder='Color' value={formData.color} />
        </div>

        <div>
          <label htmlFor="model">Year</label>
          <input className='w-full border rounded-md p-3' type="text" name="" id="" onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder='Year' value={formData.year} />
        </div>


        <div>
          <label htmlFor="model">Transmission</label>
          <select className='w-full border rounded-md p-3' name="" id="" onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}>
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div>
          <label htmlFor="model">Fuel Type</label>
          <select className='w-full border rounded-md p-3' name="" id="" onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}>
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div>
          <label htmlFor="model">Price</label>
          <input className='w-full border rounded-md p-3' type="text" name="" id="" onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder='Price' value={formData.price} />
        </div>

        <div>
          <label htmlFor="model">Type</label>
          <input className='w-full border rounded-md p-3' type="text" name="" id="" onChange={(e) => setFormData({ ...formData, type: e.target.value })} placeholder='Body Type' value={formData.type} />
        </div>

        <div>
          <label htmlFor="model">Engine</label>
          <input className='w-full border rounded-md p-3' type="text" name="" id="" onChange={(e) => setFormData({ ...formData, engine: e.target.value })} placeholder='Engine' value={formData.engine} />
        </div>

        <div>
          <label htmlFor="model">Status</label>
          <select className='w-full overflow-hidden border rounded-md p-3' name="" id="" onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            <div className='rounded-md overflow-hidden h-30 bg-teal-500'>
            <option className='' value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
            </div>
          </select>
        </div>

        <div className=''>
          <label htmlFor="model">Manufacturer</label>
          <input className='w-full border rounded-md p-3' type="text" name="" id="" onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })} placeholder='Manufacturer' value={formData.manufacturer} />
        </div>

        <div className=''>
          <label htmlFor="model">Brand</label>
          <input className='w-full border rounded-md p-3' type="text" name="" id="" onChange={(e) => setFormData({ ...formData, brand: e.target.value })} placeholder='Brand' value={formData.brand} />
        </div>

        {/* <div>
          <label htmlFor="image">Image</label>
          <input className='w-full border rounded-md p-3' type="file" name="" id="" onChange={handleImageChange} />
        </div> */}

      </div>}

      {/* form data end */}

      <Separator height='h-3' />
      {/* <div className='overflow-hidden'>
        {file && <img src={URL.createObjectURL(file)} alt="" className='rounded-md mx-auto w-1/2 object-cover' />}
      </div> */}

      <FileUploadCustom states={{ file, isDragging, setFile, setIsDragging,tab }} />

      {tab === 2 && <div>
          <label htmlFor="model">Model</label>
          <select value={model} className='w-full overflow-hidden border rounded-md p-3' name="" id="" onChange={(e) => setModel(e.target.value)}>
            <div className='rounded-md overflow-hidden h-30 bg-teal-500'>
            {
              models.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))
            }
            </div>
          </select>
        </div>}

      {tab === 1 && <div>
        <label htmlFor="model">Description</label>
        <textarea value={formData.desc} className='w-full border rounded-md p-3' name="" id="" onChange={(e) => setFormData({ ...formData, desc: e.target.value })} placeholder='Brief Description of the car' />
      </div>}

      <Separator height='h-3' />
      {tab === 1 && <button className='bg-slate-700 text-white p-2 rounded-md mx-auto w-60' onClick={(e) => handleFormSubmit(e)}>{isSubmitting ? "Adding..." : "Add Car"}</button>}
      {tab === 2 && <button className='bg-slate-700 text-white p-2 rounded-md mx-auto w-60' onClick={(e) => handleAISubmit(e)}>{isSubmitting ? "AI Uploading..." : "AI Upload"}</button>}
      <Separator height='h-3' />



    </div>: <div>Loading...</div>
    
  )
}

export default AddCarForm