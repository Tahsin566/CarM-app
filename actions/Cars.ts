"use server";

import { createClient } from "@/lib/supabase/server";
import prisma from "@/prisma";
import { google } from "@ai-sdk/google"; // Or openai
import { generateObject, } from "ai";
import { z } from "zod";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { revalidatePath } from "next/cache";

if (!prisma) {
  throw new Error("Prisma not initialized")
}

const googleGenerativeAI = createGoogleGenerativeAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY });


type CarsDataType = {
  name: string,
  model: string,
  transmission: string,
  fuel: string,
  engine: string,
  type: string,
  color: string,
  status: string,
  year: string,
  price: string,
  desc: string,
  brand: string,
  manufacturer: string,
  isFeatured: boolean
}



export async function getCars() {

  try {
    const data = await prisma.cars.findMany({
      orderBy: {
        date_of_entry: "desc",
      }
    })
    return data

  }
  catch (err) {
    console.log(err)
  }
}



export async function getCar(id: string) {
  try {
    const data = await prisma.cars.findUnique({ where: { id } })
    return data
  }
  catch (err) {
    console.log(err)
  }
}

export const getFeaturedCars = async () => {
  try {
    const data = await prisma.cars.findMany({
      where: {
        isFeatured: true,
      },
      orderBy: {
        date_of_entry: "desc",
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const getUnFeaturedCars = async () => {
  try {
    const data = await prisma.cars.findMany({
      where: {
        isFeatured: false
      },
    });

    return [...data];
  } catch (err) {
    console.log(err);
  }
}

export const getSoldCars = async () => {
  try {
    const data = await prisma.cars.findMany({
      where: {
        status: "Sold"
      },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}

export const getAvailableCars = async () => {
  try {
    const data = await prisma.cars.findMany({
      where: {
        status: "Available"
      },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}

export const markAsSold = async (id: string) => {
  try {
    await prisma.cars.update({
      where: {
        id: id
      },
      data: {
        status: "Sold"
      }
    });
    revalidatePath('/dashboard')
  } catch (err) {
    console.log(err);
  }
}

export const markAsAvailable = async (id: string) => {
  try {
    await prisma.cars.update({
      where: {
        id: id
      },
      data: {
        status: "Available"
      }
    });
    revalidatePath('/dashboard')
  } catch (err) {
    console.log(err);
  }
}



export async function uploadFile(File: File) {


  const supabase = await createClient()

  if (!File) throw new Error("No file selected")

  // 1. Convert File to a format Supabase understands (ArrayBuffer/Buffer)
  const arrayBuffer = await File.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // 2. Upload to Supabase Storage
  // We use a unique path: "folder/filename"
  const fileName = `/cars/${Date.now()}-${File.name}`
  const { data, error } = await supabase.storage
    .from("carm") // Your bucket name
    .upload(`${fileName}`, buffer, {
      contentType: File.type,
      upsert: false
    })

  if (error) {
    console.error("Storage Error:", error.message)
    return { success: false }
  }

  // 3. Get the Public URL (if the bucket is public)
  const { data: { publicUrl } } = supabase.storage
    .from("carm")
    .getPublicUrl(fileName)

  // Now you can save 'publicUrl' to your Prisma database
  // await prisma.article.create({ data: { pdfUrl: publicUrl, ... } })

  return { success: true, url: publicUrl }
}


export async function addCars(formdata: CarsDataType, file: File) {

  if (!file) throw new Error("No file selected")


  const { url } = await uploadFile(file) || ''

  const existingCars = await prisma.cars.findFirst({

    where: {
      name: formdata.name[0].toUpperCase() + formdata.name.slice(1),
    }
  })

  if (existingCars) return

  try {
    const data = await prisma.cars.create({
      data: {
        name: formdata.name[0].toUpperCase() + formdata.name.slice(1),
        model: formdata.model[0].toUpperCase() + formdata.model.slice(1),
        year: Number(formdata.year),
        price: parseFloat(formdata.price),
        desc: formdata.desc[0].toUpperCase() + formdata.desc.slice(1),
        brand: formdata.brand[0].toUpperCase() + formdata.brand.slice(1) || formdata.manufacturer,
        status: formdata.status[0].toUpperCase() + formdata.status.slice(1) || "available",
        color: formdata.color[0].toUpperCase() + formdata.color.slice(1),
        type: formdata.type[0].toUpperCase() + formdata.type.slice(1),
        engine: formdata.engine,
        fuel: formdata.fuel,
        manufacturer: formdata.manufacturer,
        transmission: formdata.transmission || "manual",
        image: url as string,
        isFeatured: formdata.isFeatured,
        date_of_entry: new Date()
      }
    })
    return data
  }
  catch (err) {
    console.log(err)
  }
}


export const processImageUsingAI = async (file: File,model = "gemini-2.5-flash" as string) => {


  if (!file || file.size === 0) {
    throw new Error("No image provided");
  }


    const arrayBuffer = await file.arrayBuffer();
    const imageUint8Array = new Uint8Array(arrayBuffer);

    const { object,response,warnings } = await generateObject({
      model: googleGenerativeAI(model),
      schema: z.object({
        name: z.string(),
        model: z.string(),
        transmission: z.string(),
        fuel: z.string(),
        engine: z.string(),
        type: z.string(),
        color: z.string(),
        year: z.string(),
        price: z.string(),
        desc: z.string(),
        brand: z.string(),
        manufacturer: z.string(),
        confidence: z.number(),

      }),
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Extract the following details from the image and respond in JSON format with the following keys: name, model, transmission, fuel, engine, type, color, year, price, desc, brand, manufacturer" },
            {
              type: "image",
              image: imageUint8Array,

            },
          ],
        },
      ],
    });

    if(warnings) console.log(warnings)
    

    return {
      name: object.name || "",
      model: object.model || "",
      transmission: object.transmission || "",
      fuel: object.fuel || "",
      confidence: object.confidence || 0,
      engine: object.engine || "",
      type: object.type || "",
      color: object.color || "",
      year: Number(object.year) || 1990,
      price: Number(object.price) || 100,
      desc: object.desc || "",
      brand: object.brand || "",
      manufacturer: object.manufacturer || "",
    };
  
};

export const deleteCar = async (id: string) => {

  const existingCars = await prisma.cars.findFirst({
    where: {
      id: id
    }
  })

  if (!existingCars) return

  try {
    await prisma.cars.delete({
      where: {
        id: id
      }
    })

    const supabase = await createClient()

    const { error, data } = await supabase.storage.from('carm').remove([`cars/${existingCars.image.split('/').pop()}` as string])

    revalidatePath('/dashboard')

  }
  catch (err) {
    console.log(err)
  }
}

export const ToggleFeatured = async (id: string, isFeatured: boolean) => {

  try {
    await prisma.cars.update({
      where: {
        id: id
      },
      data: {
        isFeatured: !isFeatured
      }
    })
    revalidatePath('/dashboard')

    return true
  }
  catch (err) {
    console.log(err)
    return false
  }
}


