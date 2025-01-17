"use client";

import React, { useState } from 'react';
import CategoryCard from './categorycards';
import Link from 'next/link';

const CategoryCardContainer: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const cards = [
    { src: '/images/OvercoreLite.jpeg', alt: 'Overcore Store', text: 'Overcore Store', link: '/store' },
    { src: '/images/OvercoreBusiness.jpeg', alt: 'Overcore Business', text: 'Overcore Business', link: '/b2b' },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-evenly space-y-4 md:space-y-0 md:space-x-4">
      {cards.map((card, index) => (
        <CategoryCard
          key={index}
          src={card.src}
          alt={card.alt}
          text={card.text}
          link={card.link}
          isHovered={hoveredIndex === index}
          isDimmed={hoveredIndex !== null && hoveredIndex !== index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default CategoryCardContainer;