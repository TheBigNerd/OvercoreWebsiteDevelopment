"use client"

import React from "react"
import BasketObject from "../components/basketObject";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import getCookieIds from "@/app/basket/components/handleData"

function getUserId() {
    const {data: session, status} = useSession()
    if (session) {
        return(
            session.user.id
        )
    }
    else {
        return null
    }
}

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

function basketArray() {
    const accountIds = getUserBasketIds(getUserId()!)
    const cookieIds = getCookieIds()
}
  

const BasketContainer = () => {
    const products = product[]
    return(
        <>
        <div className="md:w-1/2 bg-white shadow-md rounded p-4">
        {products.map(product => (

        ))}
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
        </>
        
    )

}

export default BasketContainer