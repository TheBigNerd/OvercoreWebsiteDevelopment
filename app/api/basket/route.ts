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


export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const productId = searchParams.get("productId");

    if (!userId || !productId) {
        return new Response("Missing userId or productId", { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    // Remove product from user's basket
    const updatedBasket = user.basket.filter((id: string) => id !== productId);

    // Update user's basket in the database
    await prisma.user.update({
        where: { id: userId },
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

    if (!userId) {
        //we need to add the product to cookies
        return new Response("Cookies added to basket", { status: 200 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    const updatedBasket = [...user.basket, productId];

    await prisma.user.update({
        where: { id: userId },
        data: { basket: updatedBasket },
    });

    return new Response("Product added to User basket", { status: 200 });

}