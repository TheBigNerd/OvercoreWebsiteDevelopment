"use client";

import React, { useState } from "react";
import HoverableLink from "./HoverableLink";
import Logo from "./Logo";
import { Basket } from "./button";
import { Favourites } from "./button";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/app/(protected)/_components/auth/login-button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex justify-between items-center">
            <div className="transform transition-transform duration-300 hover:scale-110">
              <Logo />
            </div>
            <ul className="hidden md:flex space-x-4 lg:space-x-32 text-white">
              <HoverableLink href="/pre-builds">Gaming Systems</HoverableLink>
              <HoverableLink href="/custom-builds">Build Your Own</HoverableLink>
              <HoverableLink href="/contact">Contact Us</HoverableLink>
            </ul>
            <div className="flex items-center space-x-6">
              <div className="w-px h-6 bg-white mx-4 hidden md:block"></div>
              <div className="flex items-center space-x-1 text-white group">
                <HoverableLink href="/favourites" icon={<Favourites />}>
                  <span>Favourites</span>
                </HoverableLink>
              </div>
              <div className="flex items-center space-x-1 text-white">
                <HoverableLink href="/basket" icon={<Basket />}>
                  <span>Basket</span>
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
              <HoverableLink href="/favourites" icon={<Favourites />}>
                <span>Favourites</span>
              </HoverableLink>
              <HoverableLink href="/basket" icon={<Basket />}>
                <span>Basket</span>
              </HoverableLink>
              <LoginButton asChild>
                <Button className="hover:scale-110 transform transition-transform duration-300">
                  Sign In
                </Button>
              </LoginButton>
            </ul>
          </div>
        )}
      </div>
      <div className="w-full bg-gray-300 py-2">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap justify-between text-gray-800">
            <HoverableLink href="/link1" underlineColor="gray-800">Link 1</HoverableLink>
            <HoverableLink href="/link2" underlineColor="gray-800">Link 2</HoverableLink>
            <HoverableLink href="/link3" underlineColor="gray-800">Link 3</HoverableLink>
            <HoverableLink href="/link4" underlineColor="gray-800">Link 4</HoverableLink>
            <HoverableLink href="/link5" underlineColor="gray-800">Link 5</HoverableLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;