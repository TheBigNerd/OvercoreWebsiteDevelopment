"use client";
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const images = [
    '/images/orange_desktop.jpg',
    '/images/image2.jpg', 
    '/images/image3.jpg', 
  ];

export default function HeroBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);
      };
    
      const resetInterval = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        startInterval();
      };
    
      useEffect(() => {
        startInterval();
        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
      }, []);

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        resetInterval();
    };
        
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        resetInterval();
    };

    return (
        <div className="relative w-[85%] h-[60vh] mx-auto overflow-hidden py-5">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full"
        onClick={prevImage}
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full"
        onClick={nextImage}
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>
    </div>
    )
}




