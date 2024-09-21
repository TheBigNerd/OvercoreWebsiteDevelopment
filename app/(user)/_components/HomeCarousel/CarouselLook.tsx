import React from 'react';
import Image from 'next/image';
import type { Product } from "@prisma/client";
import { formatCurrency } from "@/lib/formatters";

export default function CarouselLook({ product } : { product: Product }) {
	return (
		<div className="carousel-item bg-gray-300 rounded-3xl px-8 py-4">
			<Image src={product.imagePath[0]} alt="Product Image" width={300} height={300} className="rounded-lg aspect-square object-contain"/>
			<h1 className="product-name font-bold text-2xl pt-4">{product.name}</h1>
			<p className="product-price">{formatCurrency(product.priceInPence / 100)}</p>
		</div>
	);
}