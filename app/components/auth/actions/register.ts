"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid Fields"}
   }

   const { email, password, name, confirmPassword} = validatedFields.data;
   if (password !== confirmPassword) {
    return { error: "Passwords do not match!"}
   }
   const hashedPassword = await bcrypt.hash(password, 10);

   const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return {error: "Email already in use"}
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token)




    return {success: "Confirmation email sent!"}
}