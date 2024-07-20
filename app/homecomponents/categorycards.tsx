"use client";

import Image from 'next/image';
import React from 'react';

interface CategoryCardProps {
  src: string;
  alt: string;
  text: string;
  isHovered: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ src, alt, text, isHovered, isDimmed, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`w-full relative overflow-hidden transition-opacity duration-500 ${isDimmed ? 'opacity-50' : 'opacity-100'}`}
      style={{ paddingTop: '25%' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 transform transition-transform duration-500 group-hover:scale-105">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="absolute bottom-[25%] left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 px-4 text-2xl font-mono">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default CategoryCard;