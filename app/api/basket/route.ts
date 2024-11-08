import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "next-auth/react";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
	const cookieStore = cookies();
	
    const userId = searchParams.get("userId")
	const cookieValues = cookieStore.get("productBasket")?.value;
	
	const basket = [];
	
	// Check user first
	if (userId !== "undefined" && userId !== "null") {
        const user = await prisma.user.findUnique({ where: { id: userId || undefined } });
		
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


export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const productId = searchParams.get("productId");

    if (!userId && !productId) {
        return new Response("Missing userId or productId", { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId || undefined } });
    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    // Remove product from user's basket
    const updatedBasket = user.basket.filter((id: string) => id !== productId);

    // Update user's basket in the database
    await prisma.user.update({
        where: { id: userId || undefined },
        data: { basket: updatedBasket },
    });

    return new Response("Product removed from basket", { status: 200 });
}

export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const productId = searchParams.get("productId");

    if (!userId || !productId) {
        return new Response("Missing userId and productId", { status: 400 });
    }

    if (!userId || userId === "undefined" || userId === "null") {

        const cookiename = "productBasket";
        const cookie = cookies().get(cookiename);
        const cookieValue = cookie ? cookie.value : "";
                const cookieBasket = cookie ? cookie.value.split(",") : [];
        if (cookieBasket.includes(productId)) {
            return new Response("Product already in basket", { status: 200 });
        }
        const updatedCookie = cookieValue ? `${cookieValue},${productId}` : productId;
        cookies().set(cookiename, updatedCookie);
        return new Response("Cookies added to basket", { status: 200 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return new Response("User not found", { status: 405 });
    }

    const updatedBasket = [...user.basket, productId];

    await prisma.user.update({
        where: { id: userId },
        data: { basket: updatedBasket },
    });

    return new Response("Product added to User basket", { status: 200 });

}