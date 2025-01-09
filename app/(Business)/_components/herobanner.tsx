"use client";
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const images = [
  { src: '/images/orange_desktop.jpg', text: 'Browse our New Builds', link: '/pre-builds' },
  { src: '/images/image2.jpg', text: 'Overcore for business', link: '/business' },
  { src: '/images/image3.jpg', text: 'Give us a custom request', link: '/contact' },
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
    <div className="relative w-full h-[55vh] mx-auto overflow-hidden py-5 md:w-[85%]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <img src={image.src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          <div className="absolute left-4 bottom-4 text-white max-w-xs md:left-10 md:bottom-10 md:max-w-lg">
            <h2 className="font-extrabold text-xl md:text-3xl lg:text-5xl uppercase drop-shadow-xl mb-4">{image.text}</h2>
            <Link href={image.link}>
              <span className="inline-block bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                Learn More
              </span>
            </Link>
          </div>
        </div>
      ))}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full md:left-4"
        onClick={prevImage}
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full md:right-4"
        onClick={nextImage}
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>
    </div>
  );
}