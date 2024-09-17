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
      <div className="absolute bottom-[25%] top-25% left-0 w-[75%] bg-black bg-opacity-50 text-white text-center py-7 px-10 text-2xl text-nowrap font-mono">
        <p className="text-lg md:text-xl lg:text-2xl">{text}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;