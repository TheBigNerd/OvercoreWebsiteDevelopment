import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from "@prisma/client";
import { formatCurrency } from "@/lib/formatters";
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

interface FavouritelLookProps {
    product: Product;
    onDelete: (productId: string) => void;
}

export default function FavouritelLook({ product, onDelete }: FavouritelLookProps) {
    const { data } = useSession();
    const userId = data?.user.id;

    const handleDelete = async (): Promise<void> => {
        console.log(product.id);
        try {
            const response = await fetch(`/api/favourites?userId=${userId}&productId=${product.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Product removed from favourite');
                onDelete(product.id); // Call the onDelete function passed as a prop
            }
        } catch (error) {
            console.error('Failed to delete product from favourites', error);
        }
    };

    return (
        <>
        <Link href={`/pre-builds/view/${product.id}`}>
            <div className="carousel-item shadow-xl rounded-2xl px-8 py-4 cursor-pointer w-[300px] h-[400px]">
                <Image src={product.imagePath[0]} alt="Product Image" width={200} height={200} className="rounded-lg aspect-square object-contain"/>
                <h1 className="product-name font-bold text-1xl pt-4 max-w-[15rem]">{product.name}</h1>
                <div className='py-2 absolute bottom-6'>
                    <div className='py-2'> 
                <p className="product-price">{formatCurrency(product.priceInPence / 100)}</p>
                    </div>
                    <Button className='bg-slate-600'>
                        Add to Basket
                    </Button>
                </div>
            </div>
        </Link>
        <Button onClick={handleDelete}>
            Delete
        </Button>
        </>
    );
}