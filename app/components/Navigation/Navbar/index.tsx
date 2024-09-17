"use client";

import React, { useState } from "react";
import HoverableLink from "@/app/components/HoverableLink";
import Logo from "./Logo";
import { Basket } from "./button";
import { Favourites } from "./button";
import { LoginButton } from "../../auth/login-button";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-gray-900 sticky top-0 z-50">
        {/* First Row */}
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex justify-between items-center">
            {/* Logo with hover effect */}
            <div className="transform transition-transform duration-300 hover:scale-110">
              <Logo />
            </div>
            <ul className="flex space-x-32 text-white">
              <HoverableLink href="/pre-builds">Pre Builds</HoverableLink>
              <HoverableLink href="/custom-builds">Custom Builds</HoverableLink>
              <HoverableLink href="/parts">Components</HoverableLink>
              <HoverableLink href="/contact">Contact Us</HoverableLink>
            </ul>
            <div className="flex items-center space-x-6">
              {/* Separator Line */}
              <div className="w-px h-6 bg-white mx-4"></div>
              <div className="flex items-center space-x-1 text-white group">
                <HoverableLink href="/favourites">
                  <div className="flex items-center space-x-1">
                    <Favourites />
                    <span>Favourites</span>
                  </div>
                </HoverableLink>
              </div>
              <div className="flex items-center space-x-1 text-white group">
                <HoverableLink href="/basket">
                  <div className="flex items-center space-x-1">
                    <Basket />
                    <span>Basket</span>
                  </div>
                </HoverableLink>
              </div>
              <div className="flex items-center space-x-1 text-white group">
                <LoginButton mode="modal" asChild>
                  <Button className="hover:scale-110 transform transition-transform duration-300">
                    Sign In
                  </Button>
                </LoginButton>
              </div>
            </div>
          </div>
        </div>
        {/* Second Row with light grey background */}
      </div>
      <div className="w-full bg-gray-300 py-2">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between text-gray-800">
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
