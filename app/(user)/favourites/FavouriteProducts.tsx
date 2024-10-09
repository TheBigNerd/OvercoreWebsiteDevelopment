"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import type { Product } from "@prisma/client";
import FavouritelLook from "./FavouriteComponent";

export default function FavouriteProducts() {
    const [favouriteProducts, setFavouriteProducts] = useState<Product[]>([]);
    const { data, status } = useSession();
    const userId = data?.user.id;
    
    useEffect(() => {
        if (status === "authenticated") {
            fetch(`/api/favourites?userId=${userId}`)
                .then(res => res.json())
                .then(data => setFavouriteProducts(data.body));
        }
    }, [status, userId]);

    const removeProduct = (productId: string) => {
        setFavouriteProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    };
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            { favouriteProducts.map(product => (
                <FavouritelLook key={ product.id } product={ product } onDelete={ removeProduct }/>
        )) }
    </div>
    )
}