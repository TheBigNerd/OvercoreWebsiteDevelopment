"use server";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { title } from "process";

const fileSchema = z.instanceof(File, {message : "Required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const cpuSchema = z.object({
    title: z.string().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required"),
    priceInPence: z.coerce.number().int().min(1),
    Wattage: z.coerce.number().int().min(1),
    Socket: z.enum(["AM4", "AM5", "LGA1151", "LGA1200", "LGA1700"]),
    IntegratedGraphics: z.boolean(),
    IntegratedCooler: z.boolean(),
    description: z.string().min(1),
})

export async function addCpu(prevState: unknown, formData: FormData){
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
        IntegratedGraphics: formEntries.IntegratedGraphics === "on",
        IntegratedCooler: formEntries.IntegratedCooler === "on",
    };

    console.log('Form data entries:', Object.fromEntries(formData.entries()));
    const result = cpuSchema.safeParse(validationEntries)
    console.log('Parsing result:', result);
    console.log(result)
    if (result.success === false) {
        console.error('Validation failed:', result.error.formErrors.fieldErrors);
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("public/cpu", {recursive: true })
    const imagePath = `/cpu/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await prisma.cPU.create({ data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        Wattage: data.Wattage,
        Socket: data.Socket,
        IntegratedGraphics: data.IntegratedGraphics,
        IntegratedCooler: data.IntegratedCooler,
        description: data.description
    }})

    redirect("/admin/customcomponents/cpu")

    
}

export async function deleteCPU(id: string){
    const cPU = await prisma.cPU.findUnique({where: {id}});
    if(cPU == null){
        return notFound()
    }
    await prisma.cPU.delete({where: {id}})

    fs.unlink(`public${cPU.imagePath}`)
}

const editcpuSchema = cpuSchema.extend({
    image: imageSchema.optional(),
})

export async function updateCPU(id: string, prevState: unknown, formData: FormData) {
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
        IntegratedGraphics: formEntries.IntegratedGraphics === "on",
        IntegratedCooler: formEntries.IntegratedCooler === "on",
    };

    const result = editcpuSchema.safeParse(validationEntries)
    if(result.success === false){
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const cPU = await prisma.cPU.findUnique({where: {id}});

    if (cPU == null) {
        return notFound()
    }

    let imagePath = cPU.imagePath;
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${cPU.imagePath}`)
        imagePath = `/cpu/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    await prisma.cPU.update({where: {id}, data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        Wattage: data.Wattage,
        Socket: data.Socket,
        IntegratedGraphics: data.IntegratedGraphics,
        IntegratedCooler: data.IntegratedCooler,
        description: data.description
    }})

    redirect("/admin/customcomponents/cpu")
}