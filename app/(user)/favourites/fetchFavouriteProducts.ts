"use client"
import { getSession } from "next-auth/react";
import fetchUserFavourites from "./serverActions";

export default async function favouriteProducts() {
    const session = await getSession();
    const userId = session?.user.id;
    const favouriteProducts = fetchUserFavourites(userId);
    return favouriteProducts;
}
