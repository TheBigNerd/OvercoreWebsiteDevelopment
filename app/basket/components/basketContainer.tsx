"use client"

import React, { useEffect, useState } from "react"
import BasketObject from "../components/basketObject";
import basketArray from "./basketCollect";
import type { Product } from "@prisma/client"

import { getSession } from "next-auth/react";

async function getUserId() {
	const session  = await getSession();
	return session ? session.user.id : null;
}

const BasketContainer = () => {
    const [basketProducts, setBasketProducts] = useState<Product[]>();

    useEffect(() => {
        async function fetchBasketProducts() {
			const userId = await getUserId();
            const products = await basketArray(userId ?? undefined)
            setBasketProducts(products)
        }
        fetchBasketProducts()
    }, [])
// -----------------  NONE OF THE STUFF FOR WORKING WITH THE PRICE IS IMPLEMENTED YET ------------------
    return (
        <>
            <div className="md:w-1/2 bg-white shadow-md rounded p-4">
                { basketProducts && basketProducts.length > 0 ? (
                    basketProducts.map(product => (
                        <BasketObject
                            key={product.id}
                            productName={product.name}
                            priceInPence={product.priceInPence}
                            imagePath={product.imagePath}
                            brand={product.brand}
                            cpuModel={product.cpuModel}
                            gpuModel={product.gpuModel}
                            memorySize={product.memorySize}
                            memoryType={product.memoryType}
                            caseSize={product.caseSize}
                            colour={product.colour}
                            storageType={product.storageType}
                            totalStorage={product.totalStorage}
                            connectivity={product.connectivity}
                            coolingMethod={product.coolingMethod}
                        />
                    ))
                ) : (
                    <p>No items in the basket</p>
                )}
            </div>
            <div className="md:w-1/3 bg-white shadow-md rounded p-4" style={{ maxHeight:'230px'}}>
                <h2 className="text-2xl font-semibold text-center mb-3">Order Summary</h2>
                <div className="flex justify-between">
                    <p className="text-lg">Subtotal:</p>
                    <p className="text-lg">$80.00</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-lg">Shipping:</p>
                    <p className="text-lg">$5.00</p>
                </div>
                <div className="flex justify-between font-semibold text-xl mt-3">
                    <p>Total:</p>
                    <p>$85.00</p>
                </div>
                <button className="mt-6 w-full px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-400">
                    Proceed to Checkout
                </button>
            </div>
        </>
    )
}

export default BasketContainer