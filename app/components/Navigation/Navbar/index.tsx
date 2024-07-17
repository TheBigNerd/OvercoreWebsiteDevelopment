import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import {Basket} from "./button";
import {Favourites} from "./button";

const Navbar = () => {
  return (
    <>
      <div className="w-full bg-gray-100 sticky top-0 z-50 py-5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex-grow flex justify-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-3/4 p-2 border border-gray-300 rounded"
              />
            </div>
            <Favourites />
            <Basket />
          </div>
          <div className="flex justify-center items-center mt-4">
            <ul className="w-full flex justify-between text-black">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;