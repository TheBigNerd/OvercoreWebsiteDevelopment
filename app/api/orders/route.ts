import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const userId = searchParams.get("userId");

    const orders =[];

    if (userId === null) {
        return Response.json({ status: 400, body: "Missing userId" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId }, include: { orders: true } });

    const userProductIds = user?.orders.map(order => order.productId);

    const products = await prisma.product.findMany({
        where: { id: { in: userProductIds } },
    });

    orders.push(...products);

    return Response.json({ status: 200, body: orders });
}