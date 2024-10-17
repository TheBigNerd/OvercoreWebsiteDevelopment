"use server";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";


const fileSchema = z.instanceof(File, {message : "Required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInPence: z.coerce.number().int().min(1),
  image: imageSchema.refine(file => file.size > 0, "Required"),
  image2: imageSchema.refine(file => file.size > 0, "Required"),
  image3: imageSchema.refine(file => file.size > 0, "Required"),
  brand: z.string().min(1),
  isFeatured: z.boolean(),
  cpuModel: z.string().min(1),
  gpuModel: z.string().min(1),
  colour: z.string().min(1),
  caseSize: z.string().min(1),
  memorySize: z.string().min(1),
  memoryType: z.string().min(1),
  storageType: z.string().min(1),
  totalStorage: z.string().min(1),
  connectivity: z.string().min(1),
  coolingMethod: z.string().min(1),
  tagline: z.string().min(1)
})

export async function addProduct(prevState: unknown, formData: FormData){
  const formEntries = Object.fromEntries(formData.entries());

  const validationEntries = {
    ...formEntries,
    isFeatured: formEntries.isFeatured === "on"
  };
  
  console.log('Form data entries:', Object.fromEntries(formData.entries()));
  const result = addSchema.safeParse(validationEntries)
  console.log('Parsing result:', result);
  console.log(result)
  if (result.success === false) {
    console.error('Validation failed:', result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await fs.mkdir("public/products", {recursive: true })
  let imagePath: string[] = []
  imagePath.push(`/products/${crypto.randomUUID()}-${data.image.name}`)
  imagePath.push(`/products/${crypto.randomUUID()}-${data.image2.name}`)
  imagePath.push(`/products/${crypto.randomUUID()}-${data.image3.name}`)
  await fs.writeFile(`public${imagePath[0]}`, Buffer.from(await data.image.arrayBuffer()))
  await fs.writeFile(`public${imagePath[1]}`, Buffer.from(await data.image2.arrayBuffer()))
  await fs.writeFile(`public${imagePath[2]}`, Buffer.from(await data.image3.arrayBuffer()))
  
  await prisma.product.create({ data: {
    isAvailable: false,
    name: data.name,
    description: data.description,
    priceInPence: data.priceInPence,
    imagePath,
    brand: data.brand,
    isFeatured: data.isFeatured,
    cpuModel: data.cpuModel,
    gpuModel: data.gpuModel,
    colour: data.colour,
    caseSize: data.caseSize,
    memorySize: data.memorySize,
    memoryType: data.memoryType,
    storageType: data.storageType,
    totalStorage: data.totalStorage,
    connectivity: data.connectivity,
    coolingMethod: data.coolingMethod,
    tagline: data.tagline
  }})

  redirect("/admin/products")

}

export async function toggleProductAvailability(
  id: string,
  isAvailable: boolean
) {
  await prisma.product.update({ where: { id }, data: {
    isAvailable }})
}

export async function deleteProduct(id: string){
  const product = await prisma.product.delete({ where: { id }})
  if (product == null) return notFound()

  fs.unlink(`public${product.imagePath}`)
}

const editSchema = addSchema.extend({
  file:fileSchema.optional(),
  image:imageSchema.optional()
})

export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
  const formEntries = Object.fromEntries(formData.entries());
  console.log('Form entries:', formEntries);

  const validationEntries = {
    ...formEntries,
    isFeatured: formEntries.isFeatured === "on"
  };
  console.log('Validation entries:', validationEntries);

  const result = editSchema.safeParse(validationEntries);
  console.log('Validation result:', result);

  if (result.success === false) {
    console.error('Validation errors:', result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  console.log('Validated data:', data);

  const product = await prisma.product.findUnique({ where: { id } });
  console.log('Existing product:', product);

  if (product == null) {
    console.error('Product not found');
    return notFound();
  }

  let imagePath = product.imagePath;
  console.log('Initial image path:', imagePath);

  if (data.image != null && data.image.size > 0) {
    console.log('Updating image 1');
    await fs.unlink(`public${product.imagePath[0]}`);
    imagePath[0] = (`/products/${crypto.randomUUID()}-${data.image.name}`);
    await fs.writeFile(`public${imagePath[0]}`, Buffer.from(await data.image.arrayBuffer()));
  }

  if (data.image2 != null && data.image2.size > 0) {
    console.log('Updating image 2');
    await fs.unlink(`public${product.imagePath[1]}`);
    imagePath[1] = (`/products/${crypto.randomUUID()}-${data.image2.name}`);
    await fs.writeFile(`public${imagePath[1]}`, Buffer.from(await data.image2.arrayBuffer()));
  }

  if (data.image3 != null && data.image3.size > 0) {
    console.log('Updating image 3');
    await fs.unlink(`public${product.imagePath[2]}`);
    imagePath[2] = (`/products/${crypto.randomUUID()}-${data.image3.name}`);
    await fs.writeFile(`public${imagePath[2]}`, Buffer.from(await data.image3.arrayBuffer()));
  }

  console.log('Final image path:', imagePath);

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInPence: data.priceInPence,
      imagePath,
      brand: data.brand,
      isFeatured: data.isFeatured,
      cpuModel: data.cpuModel,
      gpuModel: data.gpuModel,
      colour: data.colour,
      caseSize: data.caseSize,
      memorySize: data.memorySize,
      memoryType: data.memoryType,
      storageType: data.storageType,
      totalStorage: data.totalStorage,
      connectivity: data.connectivity,
      coolingMethod: data.coolingMethod,
      tagline: data.tagline
    }
  });

  console.log('Product updated successfully');
  redirect("/admin/products");
}