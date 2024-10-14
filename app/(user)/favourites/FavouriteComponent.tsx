import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from "@prisma/client";
import { formatCurrency } from "@/lib/formatters";
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { XCircle } from 'lucide-react';

interface FavouritelLookProps {
    product: Product;
    onDelete: (productId: string) => void;
}

export default function FavouritelLook({ product, onDelete }: FavouritelLookProps) {
    const { data } = useSession();
    const userId = data?.user.id;

    const handleDelete = async (e: React.MouseEvent): Promise<void> => {
        e.stopPropagation();
        console.log(product.id);
        try {
            const response = await fetch(`/api/favourites?userId=${userId}&productId=${product.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Product removed from favourite');
                onDelete(product.id);
            }
        } catch (error) {
            console.error('Failed to delete product from favourites', error);
        }
    };

    const addToBasket = async () => {
		try {
			const response = await fetch(`/api/basket?userId=${userId}&productId=${product.id}`, {
				method: 'POST',

			})
			if (response.ok) {
				console.log('Product added to basket');
			}
		} catch (error) {
			console.error('Failed to add product to basket', error);
		} 
	}

    return (
        <>
            <div className="carousel-item shadow-xl rounded-2xl px-8 py-4 cursor-pointer w-[300px] h-[420px] relative hover:bg-slate-200 transition-colors duration-200">
                <div className="absolute top-2 right-2">
                    <Button onClick={handleDelete} className='bg-transparent hover:bg-transparent p-0 m-0'>
                        <XCircle size={24} color='black'/>
                    </Button>
                </div>
                <Image 
                    src={product.imagePath[0]} 
                    alt="Product Image" 
                    width={200} 
                    height={200} 
                    className="rounded-lg aspect-square object-contain"
                />
                <h1 className="product-name font-bold text-1xl pt-4 max-w-[15rem]">
                    {product.name}
                </h1>
                <div className='py-2'>
                    <div className='py-2'>
                        <p className="product-price">
                            {formatCurrency(product.priceInPence / 100)}
                        </p>
                    </div>
                    <div className=''>
                    <Button onClick={addToBasket} className='bg-slate-600'>
                        Add to Basket
                    </Button>
                    </div>
                </div>
            </div>
        </>
    );
}