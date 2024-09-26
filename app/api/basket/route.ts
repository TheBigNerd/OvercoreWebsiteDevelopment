import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    let userId = searchParams.get("userId");
    const cookieValues = searchParams.get("splitCookieIds");

    if (cookieValues) {
        const ids = cookieValues.split(',');
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });

        return Response.json({ status: 200, body: products });
    }

    const User = await prisma.user.findUnique({
        where: { id: userId! },
    });

    const userProductIds = User?.basket;

    const basket = await prisma.product.findMany({
        where: { id: { in: userProductIds } },
    });

    return Response.json({ status: 200, body: basket });
}