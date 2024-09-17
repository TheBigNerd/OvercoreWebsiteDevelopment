import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"

interface ProductCardProps {
    name: string,
    priceInPence: number,
	description: string,
    imagePath: string,
}

const ProductCard = ({name, priceInPence, description, imagePath}: ProductCardProps) => {
    return (
	    <Card className="flex flex-row p-4 items-center h-fit">
		    { imagePath && (
			    <div className="flex-1">
				    <Image src={imagePath} alt="Product Image" width={300} height={300}
				           className="rounded-lg aspect-square object-contain"/>
			    </div>
		    )}
		    <div className="flex-2 flex flex-col w-1/2">
			    <CardHeader>
				    <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
				    <CardDescription className="text-xl font-bold">{formatCurrency(priceInPence / 100)}</CardDescription>
		        </CardHeader>
			    <CardContent>
				    <p className="">{description}</p>
			    </CardContent>
			    <CardFooter className="w-full">
				    <Button className="w-full mt-4" size="lg">See More</Button>
			    </CardFooter>
		    </div>
	    </Card>
    );
};

export default ProductCard