"use server";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import fs from "fs/promises";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine((file) => file.size > 0 && file.type.startsWith("image/"), { message: "Invalid image" });

const addSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  priceinPence: z.preprocess(
    (val) => (val !== null && val !== undefined ? parseInt(val as string) : undefined),
    z.number().int().min(1, { message: "Price must be a positive integer" })
  ),
  image: imageSchema,
});

export async function AddProduct(prevState: unknown, formData: FormData) {
  const formEntries = Object.fromEntries(formData.entries());
  console.log("Form Data:", formEntries);


  const imageFile = formData.get("image") as File;
  if (!imageFile) {
    console.error("Image file is missing");
    return { image: ["Image file is required"] };
  }


  const result = addSchema.safeParse({ ...formEntries, image: imageFile });
  if (result.success === false) {
    console.error("Validation Errors:", result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

  await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      priceInPence: data.priceinPence,
      imagePath,
      isAvailable: false
    },
  });

  redirect("/admin/products");
}

export async function toggleProductAvailability(id : string, isAvailable: boolean) {
    await prisma.product.update({ where: { id }, data : { isAvailable }})

}

export async function deleteProduct(id : string){
    const product = await prisma.product.delete({ where: { id }})
    if (product == null) return notFound()

    await fs.unlink(`public${product.imagePath}`)
}
