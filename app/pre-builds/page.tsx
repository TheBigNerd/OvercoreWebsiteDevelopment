import { prisma } from "@/lib/prisma";
import React from "react";

import Navbar from "@/app/components/Navigation/Navbar";
import AllProducts from "@/app/pre-builds/components/allProducts";

export default async function Prebuilds({ searchParams } : { searchParams: any }) {
	const allProducts = await getProducts({});
	const filteredProducts = await getProducts(searchParams);
	
	return (
		<>
			<Navbar />
			<main className="my-4">
				<section className="text-center">
					<h1 className="text-4xl font-bold">Pre-built Computers</h1>
					<p>Don&apos;t fancy building a computer by yourself? No worries, we&apos;ll do it for you, just browse our catalogue below.</p>
				</section>
				<AllProducts all={allProducts} filtered={filteredProducts} />
			</main>
		
		</>
	)
};

async function getProducts(searchParams: any) {
	const filters: any = { isAvailable: true } // default filter
	
	// go through each search param, and add it to the filters object
	Object.keys(searchParams).forEach(key => {
		// if two or more options selected, use in (OR) filter
		if (Array.isArray(searchParams[key])) filters[key] = { in: searchParams[key] };
		else filters[key] = searchParams[key];
	})
	
	return prisma.product.findMany({
		where: {
			AND: [filters]
		}
	});
}