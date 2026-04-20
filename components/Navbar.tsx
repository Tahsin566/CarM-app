

import { LogOut, PlusCircle, User, UserCircle } from 'lucide-react'
import Link from 'next/link'
import MobileHam from './MobileHam'
import SignOutButton from './SignoutBtn'
import { getCurrentUser } from '@/actions/Auth'

const Navbar = async () => {

    const data = await getCurrentUser()

    const user = data?.claims

    
    

    return (
        <div className='flex justify-between items-center p-4 border-b border-slate-400 z-30 fixed w-full bg-white'>



            <h3 className='text-2xl font-extrabold text-slate-700 cursor-pointer'>CarM</h3>

            <div className='gap-5 md:flex lg:flex hidden items-center'>
                <Link href="/" className='cursor-pointer'>Home</Link>
                {data?.role === "admin" && <Link href="/dashboard?filter=all" className='cursor-pointer bg-slate-700 text-white p-2 rounded-md flex'>Dashboard</Link>}
                <Link href="/about" className='cursor-pointer'>About</Link>
                {user ? <UserCircle className='cursor-pointer' /> : <Link href={"/signin"} className='cursor-pointer'>Login</Link>}
                {user && <SignOutButton><div className='flex items-center gap-1 cursor-pointer'><LogOut />Logout</div></SignOutButton>}
            </div>

            <div className='flex md:hidden lg:hidden'>
                <MobileHam />
            </div>

        </div>
    )
}

export default Navbar