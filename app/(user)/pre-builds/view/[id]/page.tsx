import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import Images from "./_components/images";
import Description from "./_components/description";
import Shelf from "./_components/shelf";

import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
	const products = await prisma.product.findMany();
	
	return products.map(product => ({
		params: { id: product.id }
	}))
}

export default async function ProductPage({ params } : { params: { id: string }}) {
	const product = await getProduct(params.id);
	if (!product) return notFound();
	
	return (
		<>
			<main className="flex gap-16 my-8 container">
				<section className="flex-1">
					<Images images={product.imagePath} />
				</section>
				<section className="text-left flex-2">
					<div className="bg-gray-100 rounded-2xl shadow-xl p-4 mb-4" id="card">
						<h1 className="text-4xl font-bold">{ product.name }</h1>
						<h2 className="text-2xl italic">{ product.tagline }</h2>
						<ul className="list-disc ml-8 my-2">
							<li>2 Years Parts and Labour Warranty</li>
							<li>Built with Care and Performance in Mind</li>
							<li>Clean Cable Management</li>
						</ul>
						<h2 className="text-2xl font-bold text-muted-foreground">{formatCurrency(product.priceInPence / 100)}</h2>
						<div className="flex gap-4 mt-2">
							<Button className="flex-3">Add to Basket</Button>
							<Button className="flex-1">Favourite</Button>
						</div>
					</div>
					<Description description={ product.description }/>
				</section>
			</main>
			
			<Shelf {...product} />
		</>
	)
}

async function getProduct(id: string) {
	return prisma.product.findUnique({
		where: { id }
	});
}