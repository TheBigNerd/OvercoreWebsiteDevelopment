import Link from "next/link";
import Image from "next/image";

const Button = () => {
  return (
    <button className="h-12 rounded-lg bg-white font-bold px-5">Sign In</button>
  );
};

export default Button;

const Basket = () => {
  return (
    <Link href="/basket">
      <Image
        src="/images/cart.png"
        alt="Sign In"
        width={50}
        height={15}
        className="rounded-lg"
      />
    </Link>
  );
};

export {Basket};

const Favourites = () => {
  return (
    <Link href="/favourites">
      <Image
        src="/images/heart.png"
        alt="Favourites"
        width={50}
        height={15}
        className="rounded-lg"
      />
    </Link>
  );
};

export {Favourites};