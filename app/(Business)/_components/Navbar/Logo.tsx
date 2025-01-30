"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./button";
import React from "react";

const Logo = () => {
  //update the size of the logo when the size of the screen changes
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  // change between the logo and the button when the user scrolls
  const [showButton, setShowButton] = useState(false);

  const changeNavButton = () => {
    if (window.scrollY >= 400 && window.innerWidth < 768) {
      setShowButton(false);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavButton);
  }, []);

  return (
    <>
      <Link href="/business" style={{ display: showButton ? "none" : "block" }}>
        <Image
          src="/images/logo_red.png"
          alt="Logo"
          width={width < 1024 ? "75" : "76"}
          height={width < 1024 ? "22" : "25"}
          max-width= "50%"
          className="relative"
          
        />
      </Link>
      <div
        style={{
          display: showButton ? "block" : "none",
        }}
      >
        <button />
      </div>
    </>
  );
};

export default Logo;