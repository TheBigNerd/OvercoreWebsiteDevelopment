import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Description from "./_components/description";

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
			<main className="flex mx-16 my-4">
				<section className="flex-1">
					<Image src={product.imagePath} alt="Product Image" width={300} height={300}
					       className="rounded-lg aspect-square object-contain"/>
				</section>
				<section className="text-left flex-2">
					<h1 className="text-4xl font-bold">{product.name}</h1>
					<Description description={product.description} />
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