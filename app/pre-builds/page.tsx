import {prisma} from "@/lib/prisma";
import React from "react";
import ProductCard from "./components/product-card";
import Navbar from "@/app/components/Navigation/Navbar";

export default async function Prebuilds() {
	const defaultProducts = await getProductDefault()
	return (
		<>
			<Navbar />
			<main className="my-4">
				<section className="text-center">
					<h1 className="text-4xl font-bold">Pre-built Computers</h1>
					<p>Don&apos;t fancy building a computer by yourself? No worries, we&apos;ll do it for you, just browse our catalogue below.</p>
				</section>
				<section className="flex h-12 my-4 mx-16 gap-4">
					<div className="flex-1 bg-gray-300 rounded">
						<h2 className="text-2xl text-center">Filters</h2>
						
					</div>
					<div className="flex-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
						{ defaultProducts.map(product => (
							<ProductCard key={product.name} name={product.name} priceInPence={product.priceInPence} description={product.description} imagePath={product.imagePath} />
						)) }
					</div>
				</section>
			</main>
		
		</>
	)
};

async function getProductDefault() {
	return prisma.product.findMany({where: {isAvailable: true}});
}