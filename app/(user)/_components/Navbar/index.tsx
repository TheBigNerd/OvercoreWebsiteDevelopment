"use client"

import React, { useState } from "react";
import HoverableLink from "./HoverableLink";
import Logo from "./Logo";
import { Basket, Favourites } from "./button";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/app/(protected)/_components/auth/login-button";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import HoverableLinkDropDown from "./HoverableLinkDropDown";

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

  const [showGamingDropdown, setShowGamingDropdown] = useState(false);
  let hideDropdownTimeout: ReturnType<typeof setTimeout> | null = null;

  function handleMouseEnter() {
    if (hideDropdownTimeout) {
      clearTimeout(hideDropdownTimeout);
    }
    setShowGamingDropdown(true);
  }

  function handleMouseLeave() {
    hideDropdownTimeout = setTimeout(() => {
      setShowGamingDropdown(false);
    }, 200);
  }

  return (
    <div className="w-full bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex justify-between items-center">
          <div className="transform transition-transform duration-300 hover:scale-110">
            <Logo />
          </div>
          <ul className="hidden md:flex space-x-4 lg:space-x-32 rounded-lg text-white">
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <HoverableLink href="/pre-builds">Gaming Systems</HoverableLink>
              <div
                className={
                  "absolute left-0 top-full mt-2 w-[800px] bg-white text-black rounded-sm drop-shadow-lg shadow-lg z-50 p-2 grid grid-cols-3" +
                  (showGamingDropdown ? "" : " hidden")
                }
              >
                <div>
                  <h4 className="font-bold mb-2">Overcore Brand</h4>
                  <ul>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=overcore-lite">Overcore Lite</HoverableLinkDropDown>
                    </li>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=overcore-business">Overcore Gaming</HoverableLinkDropDown>
                    </li>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=overcore-business">Overcore Workstations</HoverableLinkDropDown>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Nvidia Graphics Cards</h4>
                  <ul>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=prebuilt">GeForce RTX 4090</HoverableLinkDropDown>
                    </li>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=workstation">GeForce RTX 4080</HoverableLinkDropDown>
                    </li>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=workstation">GeForce RTX 4070 Ti</HoverableLinkDropDown>
                    </li>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=workstation">GeForce RTX 4070</HoverableLinkDropDown>
                    </li>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=workstation">GeForce RTX 4060 Ti</HoverableLinkDropDown>
                    </li>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=workstation">GeForce RTX 4060</HoverableLinkDropDown>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">AMD Graphics Cards</h4>
                  <ul>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=prebuilt">Radeon RX 7900 XTX</HoverableLinkDropDown>
                    </li>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=workstation">Radeon RX 7900 XT</HoverableLinkDropDown>
                    </li>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=workstation">Radeon RX 7800 XT</HoverableLinkDropDown>
                    </li>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=workstation">Radeon RX 7700 XT</HoverableLinkDropDown>
                    </li>
                    <li className="px-0.5 py-0.5">
                      <HoverableLinkDropDown href="/pre-builds?type=workstation">Radeon RX 7600</HoverableLinkDropDown>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <HoverableLink href="/custom-builds">Build Your Own</HoverableLink>
            <HoverableLink href="/contact">Contact Us</HoverableLink>
          </ul>
          <div className="flex items-center space-x-6">
            <div className="w-px h-6 bg-white mx-4 hidden md:block"></div>
            <div className="flex items-center space-x-1 text-white group">
              <HoverableLink href="/favourites" icon={<Favourites />}>
                <span className="hidden sm:inline">Favourites</span>
              </HoverableLink>
            </div>
            <div className="flex items-center space-x-1 text-white">
              <HoverableLink href="/basket" icon={<Basket />}>
                <span className="hidden sm:inline">Basket</span>
              </HoverableLink>
            </div>
            <div className="flex items-center space-x-1 text-white group">
              <LoginButton asChild>
                <Button className="hover:scale-110 transform transition-transform duration-300">
                  Sign In
                </Button>
              </LoginButton>
            </div>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900">
          <ul className="flex flex-col space-y-4 p-4 text-white">
            <HoverableLink href="/pre-builds">Gaming Systems</HoverableLink>
            <HoverableLink href="/custom-builds">Build Your Own</HoverableLink>
            <HoverableLink href="/contact">Contact Us</HoverableLink>
          </ul>
        </div>
      )}
      <div className="w-full bg-gray-300 py-2">
        <div className="container mx-auto px-4">
          <div className="hidden sm:flex flex-wrap justify-between text-gray-800">
            <li className="flex items-center space-x-2">
              <Image src="/navbar/delivery.png" alt="Delivery" width={25} height={40} />
              <p className="font-bold">2 Week Delivery</p>
            </li>
            <li className="flex items-center space-x-2">
              <Image src="/navbar/customerservice.png" alt="CustomerService" width={25} height={40} />
              <p className="font-bold">24/7 Customer Support</p>
            </li>
            <li className="flex items-center space-x-2">
              <Image src="/navbar/business.png" alt="Business" width={25} height={40} />
              <p className="font-bold">Business Aligned</p>
            </li>
          </div>
          <div className="sm:hidden relative flex items-center justify-center">
            <button onClick={handlePrevSlide} className="absolute left-0">
              &lt;
            </button>
            <ul className="flex flex-wrap justify-center text-gray-800">
              <li className="flex items-center space-x-2">
                <Image src={slides[currentSlide].src} alt={slides[currentSlide].alt} width={25} height={40} />
                <p className="font-bold">{slides[currentSlide].text}</p>
              </li>
            </ul>
            <button onClick={handleNextSlide} className="absolute right-0">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;