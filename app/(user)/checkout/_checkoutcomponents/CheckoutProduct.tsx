import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"

interface CheckoutProductProps {
    name: string,
    priceInPence: number,
    imagePath: string,
}

const CheckoutProduct = ({ name, priceInPence, imagePath }: CheckoutProductProps) => {
    return (
      <>
      <div className="carousel-item shadow-xl rounded-2xl px-8 py-4 cursor-pointer w-[300px] h-[420px] relative hover:bg-slate-200 transition-colors duration-200">
          <div className="absolute top-2 right-2">
          </div>
          <Image 
              src={imagePath} 
              alt="Product Image" 
              width={200} 
              height={200} 
              className="rounded-lg aspect-square object-contain"
          />
          <h1 className="product-name font-bold text-1xl pt-4 max-w-[15rem]">
              {name}
          </h1>
          <div className='py-2'>
              <div className='py-2'>
                  <p className="product-price">
                      {formatCurrency(priceInPence / 100)}
                  </p>
              </div>
              <div className=''>
              </div>
          </div>
      </div>
  </>
    );
  };
  
  export default CheckoutProduct;