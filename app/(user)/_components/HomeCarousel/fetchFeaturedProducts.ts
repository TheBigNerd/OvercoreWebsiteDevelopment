"use server"
import { prisma } from "@/lib/prisma";

export default async function fetchFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { isFeatured: true },
  });
  return products;
}