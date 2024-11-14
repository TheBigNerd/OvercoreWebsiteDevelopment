"use server";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { title } from "process";

const fileSchema = z.instanceof(File, {message : "Required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const psuSchema = z.object({
    title: z.string().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required"),
    priceInPence: z.coerce.number().int().min(1),
    wattage: z.coerce.number().int().min(1),
    modular: z.boolean(),
    description: z.string().min(1),
})

export async function addPSU(prevState: unknown, formData: FormData){
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
        modular: formEntries.modular === "on",
    };

    console.log('Form data entries:', Object.fromEntries(formData.entries()));
    const result = psuSchema.safeParse(validationEntries)
    console.log('Parsing result:', result);
    console.log(result)
    if (result.success === false) {
        console.error('Validation failed:', result.error.formErrors.fieldErrors);
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("public/psu", {recursive: true })
    const imagePath = `/psu/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await prisma.pSU.create({ data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        wattage: data.wattage,
        modular: data.modular,
        description: data.description
    }})

    redirect("/admin/customcomponents/psu")

    
}

export async function deletePSU(id: string){
    const PSU = await prisma.pSU.findUnique({where: {id}});
    if(PSU == null){
        return notFound()
    }
    await prisma.pSU.delete({where: {id}})

    fs.unlink(`public${PSU.imagePath}`)
}

const editPSUSchema = psuSchema.extend({
    image: imageSchema.optional(),
})

export async function updatePSU(id: string, prevState: unknown, formData: FormData) {
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
        modular: formEntries.modular === "on",
    };

    const result = editPSUSchema.safeParse(validationEntries)
    if(result.success === false){
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const PSU = await prisma.pSU.findUnique({where: {id}});

    if (PSU == null) {
        return notFound()
    }

    let imagePath = PSU.imagePath;
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${PSU.imagePath}`)
        imagePath = `/psu/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    await prisma.pSU.update({where: {id}, data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        wattage: data.wattage,
        modular: data.modular,
        description: data.description
    }})

    redirect("/admin/customcomponents/psu")
}