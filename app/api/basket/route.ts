import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
	const cookieStore = cookies();
	
    const userId = searchParams.get("userId")
	const cookieValues = cookieStore.get("productBasket")?.value;
	
	const basket = [];
	
	// Check user first
	if (userId) {
		const user = await prisma.user.findUnique({ where: { id: userId } });
		
		const userProductIds = user?.basket;
		
		const dbBasket = await prisma.product.findMany({
			where: { id: { in: userProductIds } },
		});
		
		basket.push(...dbBasket);
	}
	// If nothing, check cookies
    if (basket.length == 0 && cookieValues) {
        const cookieBasket = await prisma.product.findMany({
            where: {
                id: {
                    in: cookieValues.split(",")
                }
            }
        });

        basket.push(...cookieBasket)
    }
	
	if (basket.length > 0) return Response.json({ status: 200, body: basket });
	else return Response.json({ status: 204, body: [] });
}