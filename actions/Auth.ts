"use server";

import { createClient } from "@/lib/supabase/server";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";

export const signUp = async (email: string, password: string) => {

    const supabase = createClient();

    const { auth } = await supabase

    try {
        const { data, error } = await auth.signUp({ email, password })
        revalidatePath('/', "layout")
    } catch (error) {
        console.log(error)
    }
}


export const signIn = async (email: string, password: string) => {

    const supabase = createClient();

    const { auth } = await supabase

    try {
        const { data, error } = await auth.signInWithPassword({ email, password })
        revalidatePath('/', "layout")
    } catch (error) {
        console.log(error)
    }
}

export const getCurrentUser = async () => {

    const supabase = createClient();

    const { auth } = await supabase

    const { data: claims } = await auth.getClaims()

    const { data } = await auth.getUser()

    if(!data.user) return null

    if (!data.user.email) return null

    try {

    const existingUser = await prisma.users.findUnique({
        where: {
            id: data.user.id
        }
    })

    if (!existingUser && data.user.email) {
        const newUser = await prisma.users.create({
            data: {
                id: data.user.id,
                email: data.user.email,
                name:'Tahsin',
                role: "user"

            }
        })

        return { 
            claims: claims?.claims,
            email: newUser.email,
            id: newUser.id,
            role:newUser?.role
        }

    }
    return {
        claims: claims?.claims,
        email: data.user?.email,
        id: data.user?.id,
        role:existingUser?.role
    }
}

    
    catch (error) {
        console.log(error)
    }

};

export const signOut = async () => {

    const supabase = createClient();

    const { auth } = await supabase

    try {
        await auth.signOut();
        revalidatePath('/', "layout")
    } catch (error) {
        console.log(error)
    }
}

export const getRole = async () => {
    const user = await getCurrentUser()
    return user?.role
}

