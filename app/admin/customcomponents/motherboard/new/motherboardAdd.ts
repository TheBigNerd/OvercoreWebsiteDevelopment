"use server";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { title } from "process";
import { Socket } from "@prisma/client";

const fileSchema = z.instanceof(File, {message : "Required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const motherboardSchema = z.object({
    title: z.string().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required"),
    priceInPence: z.coerce.number().int().min(1),
    Wattage: z.coerce.number().int().min(1),
    Socket: z.enum(["AM4", "AM5", "LGA1151", "LGA1200", "LGA1700"]),
    memorySlots: z.coerce.number().int().min(1),
    ATX: z.boolean(),
    EATX: z.boolean(),
    MicroATX: z.boolean(),
    MiniITX: z.boolean(),
    XLATX: z.boolean(),
    memorySpeed: z.array(z.string()),
    wifi: z.boolean(),
    description: z.string().min(1),
})

export async function addMotherboard(prevState: unknown, formData: FormData){
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
        ATX: formEntries.ATX === "on",
        EATX: formEntries.EATX === "on",
        MicroATX: formEntries.MicroATX === "on",
        MiniITX: formEntries.MiniITX === "on",
        XLATX: formEntries.XLATX === "on",
        wifi: formEntries.wifi === "on",
        memorySpeed: (formEntries.memorySpeed as string).split(",").map(speed => speed.trim()),
    };

    console.log('Form data entries:', Object.fromEntries(formData.entries()));
    const result = motherboardSchema.safeParse(validationEntries)
    console.log('Parsing result:', result);
    console.log(result)
    if (result.success === false) {
        console.error('Validation failed:', result.error.formErrors.fieldErrors);
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("public/motherboard", {recursive: true })
    const imagePath = `/motherboard/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await prisma.motherboard.create({ data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        Wattage: data.Wattage,
        Socket: data.Socket,
        memorySlots: data.memorySlots,
        ATX: data.ATX,
        EATX: data.EATX,
        MicroATX: data.MicroATX,
        MiniITX: data.MiniITX,
        XLATX: data.XLATX,
        memorySpeed: data.memorySpeed,
        wifi: data.wifi,
        description: data.description
    }})

    redirect("/admin/customcomponents/motherboard")

    
}

export async function deleteMotherboard(id: string){
    const motherboard = await prisma.motherboard.findUnique({where: {id}});
    if(motherboard == null){
        return notFound()
    }
    await prisma.motherboard.delete({where: {id}})

    fs.unlink(`public${motherboard.imagePath}`)
}

const editMotherboardSchema = motherboardSchema.extend({
    image: imageSchema.optional(),
})

export async function updateMotherboard(id: string, prevState: unknown, formData: FormData) {
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
        ATX: formEntries.ATX === "on",
        EATX: formEntries.EATX === "on",
        MicroATX: formEntries.MicroATX === "on",
        MiniITX: formEntries.MiniITX === "on",
        XLATX: formEntries.XLATX === "on",
        wifi: formEntries.wifi === "on",
        memorySpeed: (formEntries.memorySpeed as string).split(",").map(speed => speed.trim()),
    };

    const result = editMotherboardSchema.safeParse(validationEntries)
    if(result.success === false){
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const motherboard = await prisma.motherboard.findUnique({where: {id}});

    if (motherboard == null) {
        return notFound()
    }

    let imagePath = motherboard.imagePath;
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${motherboard.imagePath}`)
        imagePath = `/motherboard/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    await prisma.motherboard.update({where: {id}, data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        Wattage: data.Wattage,
        Socket: data.Socket,
        memorySlots: data.memorySlots,
        ATX: data.ATX,
        EATX: data.EATX,
        MicroATX: data.MicroATX,
        MiniITX: data.MiniITX,
        XLATX: data.XLATX,
        memorySpeed: data.memorySpeed,
        wifi: data.wifi,
        description: data.description
    }})

    redirect("/admin/customcomponents/motherboard")
}