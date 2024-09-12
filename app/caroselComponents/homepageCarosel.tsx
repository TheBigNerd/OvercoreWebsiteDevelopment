"use client"
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel';
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
        <CarouselContent>
            <CarouselItem>
                <p>Hello</p>
            </CarouselItem>
        </CarouselContent>

    </Carousel>
  );
}