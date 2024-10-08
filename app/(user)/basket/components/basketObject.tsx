'use client'
import { useState } from 'react';
import { XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { removeCookieId } from './handleData';
import { useSession } from 'next-auth/react';


interface basketObjectProps {
    id: string;
    productName: string;
    priceInPence: number;
    imagePath: string;
    brand: string;
    cpuModel: string;
    gpuModel: string;
    memorySize: string;
    memoryType: string;
    caseSize: string;
    colour: string;
    storageType: string;
    totalStorage: string;
    connectivity: string;
    coolingMethod: string;
}

const BasketObject = ({ id, productName, priceInPence, imagePath, brand, cpuModel, gpuModel, memorySize, memoryType, caseSize, colour, storageType, totalStorage, connectivity, coolingMethod }: basketObjectProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }
    const { data } = useSession();
    const userId = data?.user.id;

    const handleDelete = async (): Promise<void> => {
        try {
            const response = await fetch(`/api/basket?userId=${userId}&productId=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Product removed from basket');
                removeCookieId(id);
            }
        } catch (error) {
            console.error('Failed to delete product from basket', error);
        }
    };


    return (
        <div className="rounded-md p-3 flex flex-col hover:bg-gray-200 transition-colors duration-200">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <Image src={imagePath} alt='productImage' width={100} height={100} />
                    <div className="ml-4">
                        <h2 className="text-lg font-bold">{productName}</h2>
                        <p className="text-sm text-gray-600">{brand}</p>
                        <p className="text-sm text-gray-600">£{(priceInPence / 100).toFixed(2)}</p>
                    </div>
                </div>
                <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                    <XCircle size={24} />
                </button>
            </div>
            <button onClick={toggleExpand} className="text-blue-500 hover:text-blue-700 mt-2">
                {isExpanded ? 'Show Less' : 'Show More'}
            </button>
            {isExpanded && (
                <div className="mt-2">
                    <p><strong>CPU Model:</strong> {cpuModel}</p>
                    <p><strong>GPU Model:</strong> {gpuModel}</p>
                    <p><strong>Memory Size:</strong> {memorySize}</p>
                    <p><strong>Memory Type:</strong> {memoryType}</p>
                    <p><strong>Case Size:</strong> {caseSize}</p>
                    <p><strong>Colour:</strong> {colour}</p>
                    <p><strong>Storage Type:</strong> {storageType}</p>
                    <p><strong>Total Storage:</strong> {totalStorage}</p>
                    <p><strong>Connectivity:</strong> {connectivity}</p>
                    <p><strong>Cooling Method:</strong> {coolingMethod}</p>
                </div>
            )}
        </div>
    );
};




    


export default BasketObject;


