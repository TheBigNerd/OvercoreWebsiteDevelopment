import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"

interface CheckoutProductProps {
    name: string,
    priceInPence: number,
    imagePath: string,
}

const CheckoutProduct = ({ name, priceInPence, imagePath }: CheckoutProductProps) => {
    return (
      <Card className="flex flex-row items-center p-4 space-x-4 max-w-md">
        <div className="flex-shrink-0">
          <Image src={imagePath} alt="Product Image" width={150} height={150} className="rounded-lg object-cover" />
        </div>
        <div className="flex flex-col space-y-2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
            <CardDescription className="text-xl font-bold">{formatCurrency(priceInPence / 100)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-500">
            <p>CPU: Intel Core i9 14900K</p>
            <p>Graphics Card: NVIDIA RTX 4090</p>
            <p>Storage: 2TB SSD</p>
            <p>RAM: 64GB DDR5 5600MT/s</p>
          </CardContent>
        </div>
      </Card>
    );
  };
  
  export default CheckoutProduct;