import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card className="flex flex-col p-4 items-center h-full">
            { product.imagePath.length > 0 && (
                <div className="w-full">
                    <Image src={product.imagePath[0]} alt="Product Image" width={400} height={400}
                           className="rounded-lg aspect-square object-contain"/>
                </div>
            )}
            <div className="w-full flex flex-col">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
                    <CardDescription className="text-lg font-bold">{formatCurrency(product.priceInPence / 100)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="italic text-base">{product.tagline}</p>
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

export default ProductCard;