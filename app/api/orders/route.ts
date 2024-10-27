import { orderConfirmationEmail } from "@/lib/mail";
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

export async function POST(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get("userId");
        const products = await req.json();

        if (!userId || !products || !Array.isArray(products)) {
            return new Response(JSON.stringify({ status: 400, body: "Invalid input" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return new Response(JSON.stringify({ status: 404, body: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const order = await prisma.order.create({
            data: {
                pricePaid: products.reduce((total, product) => total + product.priceInPence, 0),
                Status: "Pending",
                UserId: userId,
            },
        });

        const orderProducts = await Promise.all(products.map((product: any) => {
            return prisma.orderProduct.create({
                data: {
                    orderId: order.id,
                    productId: product.id,
                },
            });
        }));

        await orderConfirmationEmail(user.email, products);


        return new Response(JSON.stringify({ status: 201, body: { order, orderProducts } }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating order and order products:", error);
        return new Response(JSON.stringify({ status: 500, body: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}