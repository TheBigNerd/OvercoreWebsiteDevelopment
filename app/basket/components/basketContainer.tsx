"use client"

import React, { useEffect, useState } from "react"
import BasketObject from "../components/basketObject";
import { useSession } from "next-auth/react";
import getCookieIds from "@/app/basket/components/handleData"
import basketArray from "./basketCollect";

const BasketContainer = () => {
    const [basketProducts, setBasketProducts] = useState([])

    useEffect(() => {
        async function fetchBasketProducts() {
            const products = await basketArray()
            setBasketProducts(products)
        }
        fetchBasketProducts()
    }, [])
// -----------------  NONE OF THE STUFF FOR WORKING WITH THE PRICE IS IMPLEMENTED YET ------------------
    return (
        <>
            <div className="md:w-1/2 bg-white shadow-md rounded p-4">
                {basketProducts.length > 0 ? (
                    basketProducts.map(product => (
                        <BasketObject
                            key={product.id}
                            productName={product.name}
                            priceInPence={product.priceInPence}
                            imagePath={product.imagePath}
                        />
                    ))
                ) : (
                    <p>No items in the basket</p>
                )}
            </div>
            <div className="md:w-1/3 bg-white shadow-md rounded p-4">
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