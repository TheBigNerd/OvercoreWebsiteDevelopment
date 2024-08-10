import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"

interface ProductCardProps {
    name: string,
    priceInPence: number,
    imagePath: string,
}

const ProductCard = ({name, priceInPence, imagePath}: ProductCardProps) => {
    return (
        <Card className="flex flex-col items-center p-4 space-y-4 max-w-sm">
          <div className="w-full items-center flex flex-col">
            <Image src={imagePath} alt="Product Image" width={300} height={300} className="rounded-lg object-cover" />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
            <CardDescription className="text-xl font-bold">{formatCurrency(priceInPence / 100)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-500 text-center">
            <p>CPU: Intel Core i9 14900K</p>
            <p>Graphics Card: NVIDIA RTX 4090</p>
            <p>Storage: 2TB SSD</p>
            <p>RAM: 64GB DDR5 5600MT/s</p>
          </CardContent>
          <CardFooter className="w-full">
            <Button className="w-full mt-4" size="lg">Add to Basket</Button>
          </CardFooter>
        </Card>
      );
    };          

export default ProductCard