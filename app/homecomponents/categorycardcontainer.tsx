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
    { src: '/images/OvercoreLite.jpeg', alt: 'Overcore Lite', text: 'Overcore Lite', link: `/custom-builds`},
    { src: '/images/BrowseWorkstation.jpeg', alt: 'Browse Workstation', text: 'Browse Workstation' },
    { src: '/images/OvercoreBusiness.jpeg', alt: 'Overcore Business', text: 'Overcore Business' },
  ];

  return (
    <div className="flex justify-evenly space-x-4">
      {cards.map((card, index) => (
        <CategoryCard
          key={index}
          src={card.src}
          alt={card.alt}
          text={card.text}
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