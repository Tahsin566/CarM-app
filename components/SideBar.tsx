import { Car, CarFront, CarIcon, HomeIcon, Info, Layout, LayoutDashboard, LucideCarFront, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SideBar = () => {


    const routes = [
      {
        label: 'Home',
        href: '/dashboard',
        icon: <LayoutDashboard />,
      },
      {
        label:'Cars',
        href: '/dashboard/vehicle/add',
        icon: <Car />,
      },
      {
        label: 'About',
        href: '/about',
        icon: <Info />,
      },
      {
        label: 'Contact',
        href: '/contact',
        icon: <Info />,
      }

    ]

  return (
    <div className='w-fit h-fit grid gap-2 p-2 mt-3'>
        {routes.map((route) => (
            <Link href={route.href} key={route.href} className='flex gap-4 p-2 items-center shadow border border-slate-200 rounded-md '>

                <div>{route.icon}</div>

                <div className='hidden md:block lg:block'>{route.label}</div>

            </Link>
        )) }
    </div>
  )
}

export default SideBar