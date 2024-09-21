"use server";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { title } from "process";

const fileSchema = z.instanceof(File, {message : "Required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const caseSchema = z.object({
    title: z.string().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required"),
    priceInPence: z.coerce.number().int().min(1),
    ATX: z.boolean(),
    EATX: z.boolean(),
    MicroATX: z.boolean(),
    MiniITX: z.boolean(),
    XLATX: z.boolean(),
    description: z.string().min(1),
})

export async function addCase(prevState: unknown, formData: FormData){
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
        ATX: formEntries.ATX === "on",
        EATX: formEntries.EATX === "on",
        MicroATX: formEntries.MicroATX === "on",
        MiniITX: formEntries.MiniITX === "on",
        XLATX: formEntries.XLATX === "on",
    };

    console.log('Form data entries:', Object.fromEntries(formData.entries()));
    const result = caseSchema.safeParse(validationEntries)
    console.log('Parsing result:', result);
    console.log(result)
    if (result.success === false) {
        console.error('Validation failed:', result.error.formErrors.fieldErrors);
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("public/case", {recursive: true })
    const imagePath = `/case/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await prisma.case.create({ data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        ATX: data.ATX,
        EATX: data.EATX,
        MicroATX: data.MicroATX,
        MiniITX: data.MiniITX,
        XLATX: data.XLATX,
        description: data.description
    }})

    redirect("/admin/customcomponents/case")

    
}

export async function deleteCase(id: string){
    const Case = await prisma.case.findUnique({where: {id}});
    if(Case == null){
        return notFound()
    }
    await prisma.case.delete({where: {id}})

    fs.unlink(`public${Case.imagePath}`)
}

const editCaseSchema = caseSchema.extend({
    image: imageSchema.optional(),
})

export async function updateCase(id: string, prevState: unknown, formData: FormData) {
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
        ATX: formEntries.ATX === "on",
        EATX: formEntries.EATX === "on",
        MicroATX: formEntries.MicroATX === "on",
        MiniITX: formEntries.MiniITX === "on",
        XLATX: formEntries.XLATX === "on",
    };

    const result = editCaseSchema.safeParse(validationEntries)
    if(result.success === false){
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const Case = await prisma.case.findUnique({where: {id}});

    if (Case == null) {
        return notFound()
    }

    let imagePath = Case.imagePath;
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${Case.imagePath}`)
        imagePath = `/case/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    await prisma.case.update({where: {id}, data: {
        title: data.title,
        imagePath,
        priceInPence: data.priceInPence,
        ATX: data.ATX,
        EATX: data.EATX,
        MicroATX: data.MicroATX,
        MiniITX: data.MiniITX,
        XLATX: data.XLATX,
        description: data.description
    }})

    redirect("/admin/customcomponents/case")
}