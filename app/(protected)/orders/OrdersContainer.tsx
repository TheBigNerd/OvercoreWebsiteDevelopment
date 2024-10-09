"use client"

import React from "react";
import { formatCurrency } from "@/lib/formatters";

interface OrdersContainerProps {
  productName: string
  price: number
  orderStatus: string
  orderDate: Date
}

const OrdersContainer: React.FC<OrdersContainerProps> = ({ productName, price, orderStatus, orderDate}) => {
  const formattedDate = new Date(orderDate).toLocaleDateString();
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto">
      <div className="p-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">Product 1 - Ryzen 7700X Gaming PC of amaizing goodness and friends along the way</h2>
        <p className="text-gray-600 mt-1">Order Number: {productName}</p>
        <p className="text-gray-500 mt-1">Order Status: <span className="text-green-600">{orderStatus}</span></p>
        <p className="text-gray-500 mt-1">Order Date: {formattedDate}</p>
        <p className="text-gray-500 mt-1">Total Price: {formatCurrency(price / 100)}</p>
        <div className="mt-3 flex justify-between">
          <button className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-700">
            More Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersContainer;
