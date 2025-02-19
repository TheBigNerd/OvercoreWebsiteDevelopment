import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const ctype = searchParams.get("ctype");
    const id = searchParams.get("id");

    const table = prisma[ctype as keyof typeof prisma] as any;
    const component = await table.findUnique({ where: { id: id || undefined } });
    return Response.json({ status: 200, body: component });
}