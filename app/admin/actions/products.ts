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
  image: imageSchema.refine(file => file.size > 0, "Required")
})

export async function addProduct(prevState: unknown, formData: FormData){
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await fs.mkdir("public/products", {recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

  await prisma.product.create({ data: {
    isAvailable: false,
    name: data.name,
    description: data.description,
    priceInPence: data.priceInPence,
    imagePath
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
  image: imageSchema.optional()
})

export async function updateProduct( id: string, prevState: unknown, formData: FormData){
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await prisma.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  let imagePath = product.imagePath
  if (data.image != null && data.image.size > 0){
    await fs.unlink(`public${product.imagePath}`)
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
  }


  await prisma.product.update({ where: {id}, data: {
    name: data.name,
    description: data.description,
    priceInPence: data.priceInPence,
    imagePath
  }})

  redirect("/admin/products")

}