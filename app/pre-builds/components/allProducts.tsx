"use client";
import type { Product } from "@prisma/client";
import React, { useState } from "react";

import FiltersMenu from "@/app/pre-builds/components/filters";
import ProductCard from "@/app/pre-builds/components/productCard";

export default function AllProducts({ all, filtered } : { all: Product[], filtered: Product[] }) {
	
	return (
		<section className="flex my-4 mx-16 gap-4">
			<div className="flex-1 p-4 bg-gray-200 rounded">
				<FiltersMenu products={all} />
			</div>
			<div className="flex-3 grid grid-cols-1 lg:grid-cols-2 gap-4 content-start">
				{filtered.map(product => (
					<ProductCard key={product.name} name={product.name} priceInPence={product.priceInPence}
					             description={product.description} imagePath={product.imagePath}/>
				))}
			</div>
		</section>
	)
};