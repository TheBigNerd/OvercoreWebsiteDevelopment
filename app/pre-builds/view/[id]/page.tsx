import { prisma } from "@/lib/prisma";

import Navbar from "@/app/components/Navigation/Navbar";

export async function generateStaticParams() {
	const products = await prisma.product.findMany();
	
	return products.map(product => ({
		params: { id: product.id }
	}))
}

export default async function ProductPage({ params } : { params: { id: string }}) {
	const product = await getProduct(params.id);
	
	return (
		<>
			<Navbar />
			<main className="my-4">
				<section className="text-center">
					<h1 className="text-4xl font-bold">{product.name}</h1>
					<p>{product.description}</p>
				</section>
			</main>
		</>
	)
}

async function getProduct(id: string) {
	return prisma.product.findUnique({
		where: { id }
	});
}