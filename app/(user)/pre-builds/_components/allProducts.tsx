import type { Product } from "@prisma/client";
import React from "react";

import FiltersMenu from "./filters";
import ProductCard from "./productCard";

export default function AllProducts({ all, filtered } : { all: Product[], filtered: Product[] }) {
    const productsToDisplay = filtered.length > 0 ? filtered : all;

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/4 p-4 bg-gray-200 rounded mb-4 lg:mb-0">
                <FiltersMenu products={all} />
            </div>
            <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 content-start">
                {productsToDisplay.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
};