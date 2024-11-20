"use server";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { title } from "process";

const fileSchema = z.instanceof(File, {message : "Required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const gpuSchema = z.object({
    title: z.string().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required"),
    priceInPence: z.coerce.number().int().min(1),
    Wattage: z.coerce.number().int().min(1),
    width: z.coerce.number().int().min(1),
    description: z.string().min(1),
})

export async function addGpu(prevState: unknown, formData: FormData){
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
    };

    console.log('Form data entries:', Object.fromEntries(formData.entries()));
    const result = gpuSchema.safeParse(validationEntries)
    console.log('Parsing result:', result);
    console.log(result)
    if (result.success === false) {
        console.error('Validation failed:', result.error.formErrors.fieldErrors);
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("public/gpu", {recursive: true })
    const imagePath = `/gpu/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await prisma.gpu.create({ data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        Wattage: data.Wattage,
        width: data.width,
        description: data.description
    }})

    redirect("/admin/customcomponents/gpu")
}

export async function deleteGPU(id: string){
    const GPU = await prisma.gpu.findUnique({where: {id}});
    if(GPU == null){
        return notFound()
    }
    await prisma.gpu.delete({where: {id}})

    fs.unlink(`public${GPU.imagePath}`)
}

const editgpuSchema = gpuSchema.extend({
    image: imageSchema.optional(),
})

export async function updateGPU(id: string, prevState: unknown, formData: FormData) {
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
    };

    const result = editgpuSchema.safeParse(validationEntries)
    if(result.success === false){
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const gpu = await prisma.gpu.findUnique({where: {id}});

    if (gpu == null) {
        return notFound()
    }

    let imagePath = gpu.imagePath;
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${gpu.imagePath}`)
        imagePath = `/gpu/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    await prisma.gpu.update({where: {id}, data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        Wattage: data.Wattage,
        width: data.width,
        description: data.description
    }})

    redirect("/admin/customcomponents/gpu")
}