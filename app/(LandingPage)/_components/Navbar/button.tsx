import Link from "next/link";
import Image from "next/image";

import React from "react";

const Button = () => {
  return (
    <button className="text-white text-base hover:underline">
      Sign In
    </button>
  );
};

export default Button;

const Basket = () => {
  return (
      <Image
        src="/images/cart.png"
        alt="Basket"
        width={35}
        height={15}
        className="rounded-lg"
      />
  );
};

export {Basket};

const Favourites = () => {
  return (
      <Image
        src="/images/heart.png"
        alt="Favourites"
        width={35}
        height={15}
        className="rounded-lg"
      />
  );
};

export {Favourites};