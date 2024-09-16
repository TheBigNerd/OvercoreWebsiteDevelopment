"use server";
import { number, z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { title } from "process";

const fileSchema = z.instanceof(File, {message : "Required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const MemorySchema = z.object({
    title: z.string().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required"),
    priceInPence: z.coerce.number().int().min(1),
    Wattage: z.coerce.number().int().min(1),
    numberOfSticks: z.coerce.number().int().min(1),
    speed: z.coerce.number().int().min(1),
    capacity: z.coerce.number().int().min(1),
})

export async function addMemory(prevState: unknown, formData: FormData){
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
    };

    console.log('Form data entries:', Object.fromEntries(formData.entries()));
    const result = MemorySchema.safeParse(validationEntries)
    console.log('Parsing result:', result);
    console.log(result)
    if (result.success === false) {
        console.error('Validation failed:', result.error.formErrors.fieldErrors);
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("public/memory", {recursive: true })
    const imagePath = `/memory/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await prisma.memory.create({ data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        Wattage: data.Wattage,
        numberOfSticks: data.numberOfSticks,
        speed: data.speed,
        capacity: data.capacity
    }})

    redirect("/admin/customcomponents/memory")

    
}

export async function deleteMemory(id: string){
    const memory = await prisma.memory.findUnique({where: {id}});
    if(memory == null){
        return notFound()
    }
    await prisma.memory.delete({where: {id}})

    fs.unlink(`public${memory.imagePath}`)
}

const editMemorySchema = MemorySchema.extend({
    image: imageSchema.optional(),
})

export async function updateMemory(id: string, prevState: unknown, formData: FormData) {
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
    };

    const result = editMemorySchema.safeParse(validationEntries)
    if(result.success === false){
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const memory = await prisma.memory.findUnique({where: {id}});

    if (memory == null) {
        return notFound()
    }

    let imagePath = memory.imagePath;
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${memory.imagePath}`)
        imagePath = `/memory/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    await prisma.memory.update({where: {id}, data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        Wattage: data.Wattage,
        numberOfSticks: data.numberOfSticks,
        speed: data.speed,
        capacity: data.capacity
    }})

    redirect("/admin/customcomponents/memory")
}