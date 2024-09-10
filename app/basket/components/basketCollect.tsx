"use server"

import { prisma } from "@/lib/prisma"
import getCookieIds from "./handleData"
import { getSession } from "next-auth/react";

async function getUserId() {
    const session  = await getSession();
    return session ? session.user.id : null;
}

async function getUserBasketIds(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { basket: true },
    });
    return user ? user.basket : null;
}


export default async function basketArray() {
    const userId = await getUserId();
    const accountIds = userId ? await getUserBasketIds(userId) : null; 
    const cookieIds = getCookieIds();

    if (accountIds !== null) {
        const basketproducts = await prisma.product.findMany({
            where: { id: { in: accountIds } },
        });
        return basketproducts;
    } else {
        return []; 
    }
}
  