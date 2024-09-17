"use client"
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel';
import CarouselLook from './caroselComponent';
import fetchFeaturedProducts from './fetchFeaturedProducts';

export default function HomepageCarosel() {
const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

useEffect(() => {
    const fetchProducts = async () => {
        const products = await fetchFeaturedProducts();
        setFeaturedProducts(products);
    };

    fetchProducts();
}, []);

  return (
    <Carousel>
        <CarouselContent className="flex overflow-hidden space-x-2 border-spacing-3">
            {featuredProducts.map(product => (
                <CarouselItem key={product.id} className="flex-none w-1/6 p-2 box-border">
                    <CarouselLook product={product} />
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" />
    </Carousel>
  );
}