"use server"
import { getPasswordResetTokenByToken } from "@/data/passwordResetToken";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) return { error: "Missing Token"};

    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) return {error: "Invalid fields!"}

    const { password } = validatedFields.data

    const exisitingToken = await getPasswordResetTokenByToken(token);

    if (!exisitingToken) return { error: "Invalid Token"}

    const hasExpired = new Date(exisitingToken.expires) < new Date();
    if (hasExpired) {
        return { error: "Token has expired!"}
    }

    const existingUser = await getUserByEmail(exisitingToken.email);
    if (!existingUser) return { error: "User does not exist "}

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
        where: { id: existingUser.id},
        data: { password: hashedPassword}
    })

    await prisma.passwordResetToken.delete({
        where: {id: exisitingToken.id}
    })

    return { success: "password updated!"}

}