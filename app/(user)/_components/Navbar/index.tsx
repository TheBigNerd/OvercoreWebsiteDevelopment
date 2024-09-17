"use client"; // Ensure this component is treated as a Client Component

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Basket } from "./button";
import { Favourites } from "./button";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/app/(protected)/_components/auth/login-button";

const Navbar = () => {
  return (
    <>
      <style jsx>{`
        .hover-effect {
          transform: scale(1);
          transition: transform 0.3s ease-in-out;
        }

        .hover-effect:hover {
          transform: scale(1.1);
        }

        .hover-underline {
          position: relative;
        }

        .hover-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          display: block;
          background: white;
          transition: width 0.3s ease-in-out;
          left: 0;
          bottom: -2px;
        }

        .hover-underline:hover::after {
          width: 100%;
        }

        .separator {
          width: 1px;
          height: 24px; /* Adjust height as needed */
          background-color: #ffffff; /* White color for the separator */
          margin: 0 16px; /* Adjust the margin to add spacing around the separator */
        }
      `}</style>
      <div className="w-full bg-gray-900 sticky top-0 z-50">
        {/* First Row */}
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex justify-between items-center">
            {/* Logo with hover effect */}
            <div className="hover-effect">
              <Logo />
            </div>
            <ul className="flex space-x-32 text-white">
              <li className="relative hover-effect hover-underline">
                <Link href="/pre-builds">
                  <p>Pre Builds</p>
                </Link>
              </li>
              <li className="relative hover-effect hover-underline">
                <Link href="/custom-builds">
                  <p>Custom Builds</p>
                </Link>
              </li>
              <li className="relative hover-effect hover-underline">
                <Link href="/parts">
                  <p>Components</p>
                </Link>
              </li>
              <li className="relative hover-effect hover-underline">
                <Link href="/contact">
                  <p>Contact Us</p>
                </Link>
              </li>
            </ul>
            <div className="flex items-center space-x-6">
              {/* Separator Line */}
              <div className="separator"></div>
              <div className="flex items-center space-x-1 text-white hover-effect hover-underline">
                <Favourites />
                <span>Favourites</span>
              </div>
              <div className="flex items-center space-x-1 text-white hover-effect hover-underline">
                <Basket />
                <span>Basket</span>
              </div>
              <div className="flex items-center space-x-1 text-white hover-effect hover-underline">
                <LoginButton mode="modal" asChild>
                  <Button>
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
            <li className="hover-effect hover-underline">
              <Link href="/link1">
                <p>Link 1</p>
              </Link>
            </li>
            <li className="hover-effect hover-underline">
              <Link href="/link2">
                <p>Link 2</p>
              </Link>
            </li>
            <li className="hover-effect hover-underline">
              <Link href="/link3">
                <p>Link 3</p>
              </Link>
            </li>
            <li className="hover-effect hover-underline">
              <Link href="/link4">
                <p>Link 4</p>
              </Link>
            </li>
            <li className="hover-effect hover-underline">
              <Link href="/link5">
                <p>Link 5</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;