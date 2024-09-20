import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
    return (
	    <Card className="flex flex-row p-4 items-center h-fit">
		    { product.imagePath.length > 0 && (
			    <div className="flex-1">
				    <Image src={product.imagePath[0]} alt="Product Image" width={300} height={300}
				           className="rounded-lg aspect-square object-contain"/>
			    </div>
		    )}
		    <div className="flex-2 flex flex-col w-1/2">
			    <CardHeader>
				    <CardTitle className="text-2xl font-semibold">{product.name}</CardTitle>
				    <CardDescription className="text-xl font-bold">{formatCurrency(product.priceInPence / 100)}</CardDescription>
		        </CardHeader>
			    <CardContent>
				    <p className="italic text-lg">{product.tagline}</p>
			    </CardContent>
			    <CardFooter className="w-full">
				    <Link href={`/pre-builds/view/${product.id}`}>
					    <Button className="w-full mt-4" size="lg">See More</Button>
					</Link>
			    </CardFooter>
		    </div>
	    </Card>
    );
};

export default ProductCard