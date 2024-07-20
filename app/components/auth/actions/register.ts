"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid Fields"}
   }

   const { email, password, name} = validatedFields.data;
   const hashedPassword = await bcrypt.hash(password, 10);



    return {success: "Email Sent!"}
}