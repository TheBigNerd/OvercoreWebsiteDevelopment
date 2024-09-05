import React from 'react';
import Image from 'next/image';
import Navbar from '@/app/components/Navigation/Navbar';
import missionImage from '@/public/images/Pawel.jpg';
import BasketObject from "@/app/basket/components/basketObject";
import { prisma } from '@/lib/prisma';

async function getUserBasketIds(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      basket: true,
    }
  })
  if (user == null) {
    return null
  }
  else {
    return user.basket
  }

}
  

const Basket = (


) => {
  return (
    <>
      <Navbar />
      <div className="text-light py-5">
        <div className="mb-5">
          <h1 className="text-center text-5xl">Shopping Basket</h1>
          <p className="text-center text-xl text-gray-500">
            Review your selected items and proceed to checkout.
          </p>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center pt-3 space-y-4 md:space-y-0 md:space-x-4">
            <div className="md:w-1/2 bg-white shadow-md rounded p-4">
            <BasketObject productName="Test Product" priceInPence={100} imagePath={`/products/3f928022-347e-43ef-a248-5603bf22f483-Example Product Image.jpg`}/>
            </div>
            <div className="md:w-1/3 bg-white shadow-md rounded p-4">
              <h2 className="text-2xl font-semibold text-center mb-3">Order Summary</h2>
              <div className="flex justify-between">
                <p className="text-lg">Subtotal:</p>
                <p className="text-lg">$80.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg">Shipping:</p>
                <p className="text-lg">$5.00</p>
              </div>
              <div className="flex justify-between font-semibold text-xl mt-3">
                <p>Total:</p>
                <p>$85.00</p>
              </div>
              <button className="mt-6 w-full px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-400">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Basket;
