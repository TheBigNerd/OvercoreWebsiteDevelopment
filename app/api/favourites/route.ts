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