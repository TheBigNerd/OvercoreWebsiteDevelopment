import Image from 'next/image';

type basketObjectProps = {
    productName: string
    priceInPence: number
    imagePath: string
}

const BasketObject = ({productName, priceInPence, imagePath}: basketObjectProps) => {
    return (
        <div className="flex items-center">
        <Image src={imagePath} alt='productImage' width={100} height={100}/>
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{productName}</h2>
          <p className="text-gray-600">Price: £{priceInPence}</p>
        </div>
      </div>
    )

}

export default BasketObject