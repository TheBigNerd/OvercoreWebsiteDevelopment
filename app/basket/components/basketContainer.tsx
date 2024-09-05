"use client"

import React from "react"
import BasketObject from "../components/basketObject";

const BasketContainer = () => {
    return(
        <div className="md:w-1/2 bg-white shadow-md rounded p-4">
        <BasketObject productName="Test Product" priceInPence={100} imagePath={`/products/3f928022-347e-43ef-a248-5603bf22f483-Example Product Image.jpg`}/>
        </div>
    )

}

export default BasketContainer