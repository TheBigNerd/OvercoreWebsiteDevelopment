"use client";

import React, { useState } from "react";
import HoverableLink from "./HoverableLink";
import Logo from "./Logo";
import { Basket, Favourites } from "./button";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/app/(protected)/_components/auth/login-button";
import Image from 'next/image';
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: "/navbar/delivery.png", alt: "Delivery", text: "2 Week Delivery" },
    { src: "/navbar/customerservice.png", alt: "CustomerService", text: "24/7 Customer Support" },
    { src: "/navbar/business.png", alt: "Business", text: "Business Aligned" }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full bg-gray-300 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex justify-center items-center">
          <div className="transform transition-transform duration-300 hover:scale-110">
            <Logo />
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-black group">
              {/* Add additional navbar links or components here */}
            </div>
          </div>
          <button
            className="md:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-300">
          {/* Add menu items here for smaller screens */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
