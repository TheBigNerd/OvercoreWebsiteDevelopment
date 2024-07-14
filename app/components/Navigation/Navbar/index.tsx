import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./button";

const Navbar = () => {
    return (
      <>
        <div className="w-full h-20 bg-white sticky top-0 z-50 py-5">
          <div className="container mx-auto px-4 h-full">
            <div className="flex justify-between items-center h-full">
              <Logo />
              <ul className="hidden md:flex gap-x-6 text-black">
                <li>
                  <Link href="/pre-builds">
                    <p>Pre Builds</p>
                  </Link>
                </li>
                <li>
                  <Link href="/custom-builds">
                    <p>Custom Builds</p>
                  </Link>
                </li>
                <li>
                  <Link href="/parts">
                    <p>Components</p>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <p>Contact Us</p>
                  </Link>
                </li>
              </ul>
              <Button />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Navbar;