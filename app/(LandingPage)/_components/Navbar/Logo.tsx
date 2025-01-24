"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  const [width, setWidth] = useState<number>(0);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // Adjust size dynamically based on screen width
  const logoSize = width < 1024 ? { width: 200, height: 75 } : { width: 250, height: 100 };

  return (
    <>
      <Link href="/store">
        <Image
          src="/images/logo2.png"
          alt="Logo"
          width={logoSize.width}
          height={logoSize.height}
          className="relative"
          style={{
            maxWidth: "100%", // Ensures responsiveness
            height: "auto", // Maintains aspect ratio
          }}
        />
      </Link>
    </>
  );
};

export default Logo;
