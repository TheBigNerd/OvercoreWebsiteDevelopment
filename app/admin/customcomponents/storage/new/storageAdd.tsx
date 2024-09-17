"use server";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { title } from "process";
import { connect } from "http2";

const fileSchema = z.instanceof(File, {message : "Required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const storageSchema = z.object({
    title: z.string().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required"),
    priceInPence: z.coerce.number().int().min(1),
    connection: z.string().min(1),
    capacity: z.coerce.number().int().min(1),
    wattage: z.coerce.number().int().min(1),
    description: z.string().min(1),
})

export async function addStorage(prevState: unknown, formData: FormData){
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
    };

    console.log('Form data entries:', Object.fromEntries(formData.entries()));
    const result = storageSchema.safeParse(validationEntries)
    console.log('Parsing result:', result);
    console.log(result)
    if (result.success === false) {
        console.error('Validation failed:', result.error.formErrors.fieldErrors);
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("public/storage", {recursive: true })
    const imagePath = `/storage/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await prisma.storage.create({ data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        connection: data.connection,
        capacity: data.capacity,
        wattage: data.wattage,
        description: data.description
    }})

    redirect("/admin/customcomponents/storage")
}

export async function deleteStorage(id: string){
    const storage = await prisma.storage.findUnique({where: {id}});
    if(storage == null){
        return notFound()
    }
    await prisma.storage.delete({where: {id}})

    fs.unlink(`public${storage.imagePath}`)
}

const editStorageSchema = storageSchema.extend({
    image: imageSchema.optional(),
})

export async function updateStorage(id: string, prevState: unknown, formData: FormData) {
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
    };

    const result = editStorageSchema.safeParse(validationEntries)
    if(result.success === false){
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const storage = await prisma.storage.findUnique({where: {id}});

    if (storage == null) {
        return notFound()
    }

    let imagePath = storage.imagePath;
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${storage.imagePath}`)
        imagePath = `/storage/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    await prisma.storage.update({where: {id}, data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        connection: data.connection,
        capacity: data.capacity,
        wattage: data.wattage,
        description: data.description
    }})

    redirect("/admin/customcomponents/storage")
}



   