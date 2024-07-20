"use client";
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { src: '/images/orange_desktop.jpg', text: 'Orange Desktop' },
  { src: '/images/image2.jpg', text: 'Image 2 Description' },
  { src: '/images/image3.jpg', text: 'Image 3 Description' },
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
          <img src={image.src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          {index === currentIndex && (
            <div className="absolute bottom-10 left-10 bg-black bg-opacity-50 text-white p-4 rounded">
              <h2 className="text-xl">{image.text}</h2>
            </div>
          )}
        </div>
      ))}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full"
        onClick={prevImage}
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full"
        onClick={nextImage}
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>
    </div>
  );
}

