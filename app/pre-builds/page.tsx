import { prisma } from "@/lib/prisma";
import React from "react";

import Navbar from "@/app/components/Navigation/Navbar";
import AllProducts from "@/app/pre-builds/components/allProducts";

export default async function Prebuilds({ searchParams } : { searchParams: any }) {
	const availableProducts = await getProducts(searchParams);
	
	return (
		<>
			<Navbar />
			<main className="my-4">
				<section className="text-center">
					<h1 className="text-4xl font-bold">Pre-built Computers</h1>
					<p>Don&apos;t fancy building a computer by yourself? No worries, we&apos;ll do it for you, just browse our catalogue below.</p>
				</section>
				<AllProducts availableProducts={availableProducts} />
			</main>
		
		</>
	)
};

async function getProducts(searchParams: any) {
	const filters: any = { isAvailable: true }
	Object.keys(searchParams).forEach(key => {
		filters[key] = searchParams[key];
	})
	
	return prisma.product.findMany({
		where: {
			AND: [filters]
		}
	});
}