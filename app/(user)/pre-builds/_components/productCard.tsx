import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card className="flex flex-col h-[650px] w-[300px] overflow-hidden">
            { product.imagePath.length > 0 && (
                <div className="w-full">
                    <Image src={product.imagePath[0]} alt="Product Image" width={300} height={300}
                           className="rounded-lg aspect-square object-contain"/>
                </div>
            )}
            <div className="flex flex-col flex-1">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold line-clamp-4 h-[5.5rem]">{product.name}</CardTitle>
                    <CardDescription className="text-red-600 text-lg font-bold mt-2">{formatCurrency(product.priceInPence / 100)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="italic text-base line-clamp-2 overflow-hidden">{product.tagline}</p>
                </CardContent>
                <CardFooter className="mt-auto w-full">
                    <Link href={`/pre-builds/view/${product.id}`}>
                        <Button className="w-full mt-4" size="lg">See More</Button>
                    </Link>
                </CardFooter>
            </div>
        </Card>
    );
};

export default ProductCard;