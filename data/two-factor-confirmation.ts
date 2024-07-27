import { prisma } from "@/lib/prisma"

export const getTwoFactorConfirmationbyUserId = async ( userId: string ) => {
    try {
        const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique
        ({
             where: { userId }
        });
        return twoFactorConfirmation
    } catch {
        return null;
    }
}