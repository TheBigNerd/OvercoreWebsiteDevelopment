import type { Product } from "@prisma/client";
import React from "react";

import FiltersMenu from "./filters";
import ProductCard from "./productCard";

export default function AllProducts({ all, filtered } : { all: Product[], filtered: Product[] }) {
	return (
		<>
			<div className="flex-1 p-4 bg-gray-200 rounded">
				<FiltersMenu products={all} />
			</div>
			<div className="flex-3 grid grid-cols-1 lg:grid-cols-2 gap-4 content-start">
				{filtered.map(product => (
					<ProductCard key={product.name} product={product} />
				))}
			</div>
		</>
	)
};