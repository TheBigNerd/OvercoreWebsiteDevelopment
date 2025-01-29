"use server"

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const addContactSchema = z.object({
firstName: z.string().min(1),
lastName: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1)
})

export async function addContactForm(formData: FormData){
  const formEntries = Object.fromEntries(formData.entries());

  const result = addContactSchema.safeParse(formEntries)
  if (result.success === false) {
    console.error('Validation failed:', result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await prisma.contactForm.create({
    data: {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    message: data.message
    }
  })
}
