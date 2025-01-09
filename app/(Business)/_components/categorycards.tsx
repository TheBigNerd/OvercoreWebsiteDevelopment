"use client";

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface CategoryCardProps {
  src: string;
  alt: string;
  text: string;
  link: string;
  isHovered: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ src, alt, text, link, isHovered, isDimmed, onMouseEnter, onMouseLeave }) => {
  return (
    <Link
      href={link}
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
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 px-4 text-lg md:text-xl lg:text-2xl font-mono sm:bottom-[25%] sm:w-[75%] sm:left-0 sm:py-7 sm:px-10">
        <p className="text-lg md:text-xl lg:text-2xl">{text}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;