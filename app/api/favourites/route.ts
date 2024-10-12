import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const userId = searchParams.get("userId");
	if (!userId) {
		return Response.json({ status: 400, body: { error: "User ID is required" } });
	}
	
	const user = await prisma.user.findUnique({
		where: { id: userId },
	});
	const userProductIds = user?.favourites;
	
	const favourites = await prisma.product.findMany({
		where: { id: { in: userProductIds } },
	});
	return Response.json({ status: 200, body: favourites });
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
    const updatedFavourites = user.basket.filter((id: string) => id !== productId);

    // Update user's basket in the database
    await prisma.user.update({
        where: { id: userId },
        data: { favourites: updatedFavourites },
    });

    return new Response("Product removed from favourites", { status: 200 });
}

export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const productId = searchParams.get("productId");

    if (!userId || !productId) {
        return new Response("Missing userId and productId", { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    const updatedFavourites = [...user.favourites, productId];

    await prisma.user.update({
        where: { id: userId },
        data: { favourites: updatedFavourites },
    });

    return new Response("Product added to User favourites", { status: 200 });

}