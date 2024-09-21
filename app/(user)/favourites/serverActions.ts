import { prisma } from "@/lib/prisma";


export default async function fetchUserFavourites(userId : string) {
    const dbUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    const userProductIds = dbUser?.favourites;
    const favouriteProducts = await prisma.product.findMany({
        where: {
            id: {
                in: userProductIds,
            },
        },
    });
    return favouriteProducts
}