import Image from 'next/image';
import React from 'react';

interface receiptProps{
    imageSrc: string
    name: string
    description: string
    price: number
}

export default function Product({ imageSrc, name, description, price }: receiptProps) {
    return (
        <div className="flex items-start mb-6">
            {/* Product Image */}
            <div className="w-1/3">
                <Image src={imageSrc} alt={name} width={150} height={150} className="rounded-md" />
            </div>

            {/* Product Details */}
            <div className="w-2/3 ml-4">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-gray-500">{description}</p>
                <p className="mt-2 text-gray-900 font-bold">${price}</p>
            </div>
        </div>
    );
}
