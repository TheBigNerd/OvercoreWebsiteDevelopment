import React from "react";
import Image from "next/image";
import pav from '@/public/images/Pawel.jpg';

const OrdersContainer = () => {
  return (
    <div className="bg-slate-200 rounded-lg shadow-lg p-4 max-w-3xl mx-auto mt-16 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Image src={pav} alt="Product 1 Image" className="w-full h-40 object-cover" />
          <div className="p-3">
            <h2 className="text-2xl font-semibold text-gray-800">Product 1</h2>
            <p className="text-gray-600 mt-1">Price: $25.00</p>
            <p className="text-gray-500 mt-1">Order Status: <span className="text-green-600">Delivered</span></p>
            <p className="text-gray-500 mt-1">Order Date: June 15, 2024</p>
            <div className="mt-3 flex justify-between">
              <button className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-700">
                Reorder
              </button>
              <button className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-700">
                Track Order
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Image src={pav} alt="Product 2 Image" className="w-full h-40 object-cover" />
          <div className="p-3">
            <h2 className="text-2xl font-semibold text-gray-800">Product 2</h2>
            <p className="text-gray-600 mt-1">Price: $30.00</p>
            <p className="text-gray-500 mt-1">Order Status: <span className="text-yellow-500">In Transit</span></p>
            <p className="text-gray-500 mt-1">Order Date: June 20, 2024</p>
            <div className="mt-3 flex justify-between">
              <button className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-700">
                Reorder
              </button>
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
