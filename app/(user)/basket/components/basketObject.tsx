import { useState } from 'react';
import { XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type basketObjectProps = {
    productName: string
    priceInPence: number
    imagePath: string
    brand: string
    cpuModel: string
    gpuModel: string
    memorySize: string
    memoryType: string
    caseSize: string
    colour: string
    storageType: string
    totalStorage: string
    connectivity: string
    coolingMethod: string
}

const BasketObject = ({productName, priceInPence, imagePath, brand, cpuModel, gpuModel, memorySize, memoryType, caseSize, colour, storageType, totalStorage, connectivity, coolingMethod}: basketObjectProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className=" rounded-md p-3 flex flex-col hover:bg-gray-200 transition-colors duration-200">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <Image src={imagePath} alt='productImage' width={100} height={100}/>
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold">{productName}</h2>
                        <p className="text-gray-600">Price: £{priceInPence}</p>
                    </div>
                </div>
                <div className='text-sm'>
                  <p>{brand}</p>
                  <p>{cpuModel}</p>
                  <p>{gpuModel}</p>
                  <p>{memorySize} {memoryType}</p>
                </div>
                <div className="ml-5">
                    <button>
                        <XCircle size={24} />
                    </button>
                </div>
            </div>
            <button onClick={toggleExpand} className="self-end mt-2 text-sm">
                {isExpanded ? 'Show Less' : 'More Information'}
            </button>
            {isExpanded && (
                <div className="mt-2 p-2 border-t border-gray-300 text-sm">
                    <p>Processor: {cpuModel}</p>
                    <p>Graphics Card: {gpuModel}</p>
                    <p>Memory: {memorySize} {memoryType}</p>
                    <p>Case Size: {caseSize}</p>
                    <p>Colour: {colour}</p>
                    <p>Storage Type: {storageType}</p>
                    <p>Total Storage: {totalStorage}</p>
                    <p>Connectivity: {connectivity}</p>
                    <p>Cooling Method: {coolingMethod}</p>
                </div>
            )}
        </div>
    )
}

export default BasketObject;