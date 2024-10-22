
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import Images from "./_components/images";
import Description from "./_components/description";
import Shelf from "./_components/shelf";

import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import AddToBasketButton from "@/app/(user)/pre-builds/_components/addToBasketButton"
import AddToFavourites from "../../_components/addToFavourites";
import Image from "next/image";

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
				<section className="flex-6">
					<Images images={product.imagePath} />
				</section>
				<section className="text-left flex-3 max-w-xl mx-auto">
					<div className="bg-gray-100 rounded-2xl shadow-xl p-4 mb-4" id="card">
						<h1 className="text-3xl font-bold py-3">{ product.name }</h1>
						<h2 className="text-1xl italic py-2">{ product.tagline }</h2>
						<p className="">{product.cpuModel}, {product.gpuModel}, {product.memorySize} {product.memoryType}, {product.totalStorage} {product.storageType}</p>
						<ul className="ml-0 my-5 py-1">
							<li><Image src="/images/ALL_TOGETHER.png" alt="cable" width={400} height={100}/></li>
						</ul>
						<h2 className="text-2xl font-bold text-muted-foreground">{formatCurrency(product.priceInPence / 100)}</h2> <h1>Including VAT</h1>
						<p className="text-xs">(£24.99 Shipping per computer sized product)</p>
						<div className="flex gap-4 mt-2">
							<AddToBasketButton productId={product.id} />
							<AddToFavourites productId={product.id} />
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