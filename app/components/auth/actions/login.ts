"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/tokens";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { prisma } from "@/lib/prisma";
import { getTwoFactorConfirmationbyUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid Fields"}
   }

   const { email, password, code} = validatedFields.data;

   const existingUser = await getUserByEmail(email);
   if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!"}
   }
   if (!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)
    return { success: "Confirmation email sent!"}
   }

   if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
        const TwoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
        if (!TwoFactorToken) {
            return {error: "Invlaid Code"}
        }
        if (TwoFactorToken.token !== code) {
            return {error: "Invalid Code"}
        }

        const hasExpired = new Date(TwoFactorToken.expires) < new Date();
        if (hasExpired) {
            return {error: "Code Expired"}
        }

        await prisma.twoFactorToken.delete({
            where: { id: TwoFactorToken.id}
        })

        const existingConfirmation = await getTwoFactorConfirmationbyUserId(existingUser.id)
        if (existingConfirmation) {
            await prisma.twoFactorConfirmation.delete({
                where: { id: existingConfirmation.id}
            })
        }
        await prisma.twoFactorConfirmation.create({
            data: {
                userId: existingUser.id
            }
        })

    }else {
    const twoFactorToken = await generateTwoFactorToken(existingUser.email)
    await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
    return { twoFactor: true}
    }
   }

   try {
    await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
    })


   } catch(error){
    if (error instanceof AuthError) {
        switch (error.type) {
            case "CredentialsSignin": return { error: "Invalid Credentials!"}
            default: return { error: "Something went wrong!"}
        }

    }
    throw error

   }
}

