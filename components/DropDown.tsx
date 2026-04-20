"use client"

import { deleteCar, markAsAvailable, markAsSold, ToggleFeatured } from '@/actions/Cars'
import { Ellipsis, Loader, Loader2, Menu, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import Separator from './Separator'
import { toast } from 'sonner'

const DropDown = ({id,feature_status,status:car_puchase_status}:{id:string,feature_status:boolean,status:string}) => {

  const [isOpen, setIsOpen] = React.useState(false)
  const [featured, setFeatured] = React.useState(false)
  const [status, setStatus] = React.useState("Available")
  const [deleteMenu, setDeleteMenu] = React.useState(false)

  

  const handleDelete = async (id:string) => {
    try {
      await deleteCar(id)
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsOpen(false)
    }
  }

  const handleFeature = async (id:string) => {
    try {
      await ToggleFeatured(id,feature_status)
      setFeatured(!feature_status)
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsOpen(false)
    }
  }

  const handleMarkAsSold = async (id:string) => {
    try {
      await markAsSold(id)
      setStatus("Sold")
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsOpen(false)
    }
  }

  const handleMarkAsAvailable = async (id:string) => {
    try {
      await markAsAvailable(id)
      setStatus("Available")
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const getFeaturedAndStatus = async () => {
      try {
        setFeatured(feature_status || false)
        setStatus(car_puchase_status || "Available")
      } catch (error) {
        console.log(error)
      }

    }

    getFeaturedAndStatus()
  }, [id])

  if(deleteMenu){

    toast.custom(() => (
      <div
        className={`${
          true ? "" : ""
        } fixed bottom-0 right-0 z-50 w-70 flex items-center justify-center p-4`}
      >
        {/* Backdrop */}
        <div 
          className="fixed inset-0 w-full h-full z-[-1] bg-slate-950/80 backdrop-blur-sm" 
          onClick={() => toast.dismiss()} 
        />
    
        {/* Modal Card */}
        <div className="relative bg-[#0f172a] border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full flex flex-col gap-6">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
            <p className="text-slate-400 text-sm">
              This action cannot be undone. This car will be permanently removed from the marketplace.
            </p>
          </div>
    
          <div className="flex flex-col gap-3">
            {/* Delete Button - Dangerous Action */}
            <button
              onClick={() => {
                handleDelete(id);
                setDeleteMenu(false);
                setIsOpen(false);
                toast.dismiss();
              }}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all active:scale-95"
            >
              Yes, Delete Car
            </button>
    
            {/* Cancel Button - Using your White + Green Shadow style */}
            <button
              onClick={() => {
                setDeleteMenu(false);
                setIsOpen(false);
                toast.dismiss(); // Hides toast after selection
              }}
              className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_0_2px_#10b981,0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_0_3px_#10b981,0_0_25px_rgba(16,185,129,0.6)] active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ), { duration: Infinity,id: "delete" }); // Keeps it open until a button is clicked

  }

  return (
    <div className='z-20'>

    <button onClick={() => setIsOpen(!isOpen)} className='text-white absolute top-2 right-2'><Ellipsis className='bg-neutral-700 w-8 h-8 p-1 rounded-md' size={20} /></button>

    {isOpen && <div className='absolute top-10 right-2 flex flex-col gap-2 bg-slate-950 text-white p-2 rounded-md'>
      <button onClick={() => handleFeature(id)} className='text-start border border-slate-800 rounded-md p-1 cursor-pointer'>{featured ? "Mark as Not Featured" : "Mark as Featured"}</button>
      <button onClick={() => status === "Available" ? handleMarkAsSold(id) : handleMarkAsAvailable(id)} className='text-start border border-slate-800 rounded-md p-1 cursor-pointer'>Mark as {status === "Available" ? "Sold" : "Available"}</button>
      <Separator height="h-3" />
      <button onClick={() => setDeleteMenu(true)} className='text-start flex gap-1 items-center border border-slate-800 rounded-md p-1 cursor-pointer'><Trash2 className='text-red-500' size={20} />Delete</button>
    </div>}


    </div>

  )
}

export default DropDown