import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Description from "./_components/description";
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
			<main className="flex m-4 gap-4">
				<section className="flex-1">
					<Image src={ product.imagePath } alt="Product Image" width={ 500 } height={ 500 }
					       className="rounded-lg aspect-square object-contain m-auto sticky top-1/2 -translate-y-1/2"/>
				</section>
				<section className="text-left flex-2">
					<h1 className="text-4xl font-bold">{ product.name }</h1>
					<Description description={ product.description }/>
				</section>
			</main>
			<section className="sticky bottom-0 bg-slate-300 flex py-2 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] ">
				<div className="flex-1">
					<h1 className="text-2xl font-bold">{ product.name }</h1>
					<p>{formatCurrency(product.priceInPence / 100)}</p>
				</div>
				<div className="flex-1 flex text-right justify-end items-center">
					<Button>Add to Basket</Button>
				</div>
			</section>
		</>
	)
}

async function getProduct(id: string) {
	return prisma.product.findUnique({
		where: { id }
	});
}