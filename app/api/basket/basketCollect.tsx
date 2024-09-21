import { prisma } from "@/lib/prisma";

export async function basketArray(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      basket: true,
    },
  });
  const productIds = user?.basket;
  console.log('Product IDs from basketArray:', productIds); // Debug log
  if (productIds === undefined) {
    return null;
  }
  return productIds;
}

export async function fetchProductDetails(productIds: string[]) {
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });
  console.log('Products from fetchProductDetails:', products); // Debug log
  return products;
}