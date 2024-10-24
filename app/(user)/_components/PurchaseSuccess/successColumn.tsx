"use client"

import Image from "next/image";
import ProductReceipt from "@/app/(user)/_components/receiptComponent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { OrderProduct } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function successColumn() {
    const { data } = useSession();
    const userId = data?.user.id;
    const [parsedProducts, setParsedProducts] = useState<OrderProduct[]>([]);

    useEffect(() => {
        const products = localStorage.getItem("basket");
        if (products) {
            const parsed = JSON.parse(products);
            setParsedProducts(parsed);

            fetch(`/api/orders?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsed),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10">
        <Image src={"/images/tick.png"} alt="Success Tick" width={100} height={100} />
        <h1 className="text-3xl font-bold mt-4">Payment Successful!</h1>
        <p className="text-lg mt-2">Thank you for your purchase. Your order has been successfully processed.</p>
    
        <Button  className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300">
            <Link href="/">
            Return to Home   
            </Link>
          
        </ Button>
    
        <div className="mt-10 p-6 border border-gray-300 bg-gray-50 rounded-lg shadow-md max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Order Receipt:</h2>
            <p className="mb-4 py-3">You should recieve an email confirming your order. Please check your spam.</p>
            {parsedProducts.map((product: any, index: number) => (
                    <ProductReceipt
                        key={index}
                        name={product.name}
                        description={product.tagline}
                        price={product.priceInPence/100}
                        imageSrc={product.imagePath[0]}
                    />
                ))}
            <p className="py-3">More information about your order should be available in your user area.</p>
        </div>
    </div>
    )
}

