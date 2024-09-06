import { prisma } from "@/lib/prisma";
import React from "react";
import ProductCard from "./components/product-card";
import FiltersMenu from "./components/filters";
import Navbar from "@/app/components/Navigation/Navbar";

export default async function Prebuilds() {
	const availableProducts = await getProducts();
	
	return (
		<>
			<Navbar />
			<main className="my-4">
				<section className="text-center">
					<h1 className="text-4xl font-bold">Pre-built Computers</h1>
					<p>Don&apos;t fancy building a computer by yourself? No worries, we&apos;ll do it for you, just browse our catalogue below.</p>
				</section>
				<section className="flex my-4 mx-16 gap-4">
					<div className="flex-1 p-4 bg-gray-200 rounded">
						<FiltersMenu products={availableProducts} />
					</div>
					<div className="flex-3 grid grid-cols-1 lg:grid-cols-2 gap-4 content-start">
						{ availableProducts.map(product => (
							<ProductCard key={product.name} name={product.name} priceInPence={product.priceInPence} description={product.description} imagePath={product.imagePath} />
						)) }
					</div>
				</section>
			</main>
		
		</>
	)
};

async function getProducts() {
	return prisma.product.findMany({ where: { isAvailable: true } });
}