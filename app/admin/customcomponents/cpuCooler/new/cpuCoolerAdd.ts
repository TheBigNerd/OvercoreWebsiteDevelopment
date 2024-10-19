"use server";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { title } from "process";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"));

const cpuCoolerSchema = z.object({
    title: z.string().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required"),
    priceInPence: z.coerce.number().int().min(1),
    wattage: z.coerce.number().int().min(1),
    AM4: z.boolean(),
    AM5: z.boolean(),
    LGA1151: z.boolean(),
    LGA1200: z.boolean(),
    LGA1700: z.boolean(),
    description: z.string().min(1),
});

export async function addCpuCooler(prevState: unknown, formData: FormData) {
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
        AM4: formEntries.AM4 === "on",
        AM5: formEntries.AM5 === "on",
        LGA1151: formEntries.LGA1151 === "on",
        LGA1200: formEntries.LGA1200 === "on",
        LGA1700: formEntries.LGA1700 === "on"
    };

    console.log('Form data entries:', Object.fromEntries(formData.entries()));
    const result = cpuCoolerSchema.safeParse(validationEntries);
    console.log('Parsing result:', result);
    if (result.success === false) {
        console.error('Validation failed:', result.error.formErrors.fieldErrors);
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    await fs.mkdir("public/cpuCooler", { recursive: true });
    const imagePath = `/cpuCooler/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

    await prisma.cpuCooler.create({
        data: {
            title: data.title,
            imagePath,
            priceInPence: data.priceInPence,
            wattage: data.wattage,
            AM4: data.AM4,
            AM5: data.AM5,
            LGA1151: data.LGA1151,
            LGA1200: data.LGA1200,
            LGA1700: data.LGA1700,
            description: data.description
        }
    });

    redirect("/admin/customcomponents/cpuCooler");
}

export async function deleteCPUCooler(id: string) {
    const cpuCooler = await prisma.cpuCooler.findUnique({ where: { id } });
    if (cpuCooler == null) {
        return notFound();
    }
    await prisma.cpuCooler.delete({ where: { id } });

    fs.unlink(`public${cpuCooler.imagePath}`);
}

const editcpuCoolerSchema = cpuCoolerSchema.extend({
    image: imageSchema.optional(),
});

export async function updateCpuCooler(id: string, prevState: unknown, formData: FormData) {
    const formEntries = Object.fromEntries(formData.entries());

    const validationEntries = {
        ...formEntries,
        AM4: formEntries.AM4 === "on",
        AM5: formEntries.AM5 === "on",
        LGA1151: formEntries.LGA1151 === "on",
        LGA1200: formEntries.LGA1200 === "on",
        LGA1700: formEntries.LGA1700 === "on"
    };

    console.log('Form data entries:', formEntries);
    console.log('Validation entries:', validationEntries);

    const result = editcpuCoolerSchema.safeParse(validationEntries);
    console.log('Parsing result:', result);
    if (result.success === false) {
        console.error('Validation failed:', result.error.formErrors.fieldErrors);
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;
    console.log('Parsed data:', data);

    const cpuCooler = await prisma.cpuCooler.findUnique({ where: { id } });
    console.log('Existing CPU Cooler:', cpuCooler);

    if (cpuCooler == null) {
        console.error('CPU Cooler not found');
        return notFound();
    }

    let imagePath = cpuCooler.imagePath;
    if (data.image != null && data.image.size > 0) {
        console.log('Updating image...');
        await fs.unlink(`public${cpuCooler.imagePath}`);
        imagePath = `/cpuCooler/${crypto.randomUUID()}-${data.image.name}`;
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
        console.log('New image path:', imagePath);
    }

    await prisma.cpuCooler.update({
        where: { id },
        data: {
            title: data.title,
            imagePath,
            priceInPence: data.priceInPence,
            wattage: data.wattage,
            AM4: data.AM4,
            AM5: data.AM5,
            LGA1151: data.LGA1151,
            LGA1200: data.LGA1200,
            LGA1700: data.LGA1700,
            description: data.description
        }
    });

    console.log('CPU Cooler updated successfully');
    redirect("/admin/customcomponents/cpuCooler");
}