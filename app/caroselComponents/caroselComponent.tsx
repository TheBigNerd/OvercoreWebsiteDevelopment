import React from 'react';
import Image from 'next/image';

interface CarouselItemProps {
    product: {
        image: string;
        name: string;
        price: number;
    };
}

const CarouselLook: React.FC<CarouselItemProps> = ({ product }) => {
    return (
        <div className="carousel-item">
            <Image src={product.image} alt={product.name} />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
        </div>
    );
};

export default CarouselLook;