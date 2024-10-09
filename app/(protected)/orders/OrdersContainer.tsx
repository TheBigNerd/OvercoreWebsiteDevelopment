"use client"

import React from "react";
import Image from "next/image";
import pav from '@/public/images/Pawel.jpg';

interface OrdersContainerProps {
  productName: string
  price: number
  orderStatus: string
  orderDate: Date
}

const OrdersContainer: React.FC<OrdersContainerProps> = ({ productName, price, orderStatus, orderDate}) => {
  return (
    <div className="bg-slate-200 rounded-lg shadow-lg p-4 max-w-3xl mx-auto mt-16 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-3">
            <h2 className="text-2xl font-semibold text-gray-800">Product 1</h2>
            <p className="text-gray-600 mt-1">Order Number: {productName}</p>
            <p className="text-gray-500 mt-1">Order Status: <span className="text-green-600">{orderStatus}</span></p>
            <p className="text-gray-500 mt-1">Order Date: "fuck off"</p>
            <p className="text-gray-500 mt-1">Total Price: formatCurren{price}</p>
            <div className="mt-3 flex justify-between">
              <button className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-700">
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrdersContainer;

