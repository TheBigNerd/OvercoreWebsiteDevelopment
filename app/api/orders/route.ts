import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (userId === null) {
        return new Response(JSON.stringify({ status: 400, body: "Missing userId" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: userId }, include: { orders: true } });

        if (!user || !user.orders) {
            return new Response(JSON.stringify({ status: 404, body: "No User or No Orders" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const orders = [...user.orders];
        return new Response(JSON.stringify({ status: 200, body: orders }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return new Response(JSON.stringify({ status: 500, body: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}