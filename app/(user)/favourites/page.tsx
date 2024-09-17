import React from 'react';
import Image from 'next/image';
import missionImage from '@/public/images/Pawel.jpg';

const Favorites = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Favorites</h1>
          <p className="text-center text-lg text-gray-600 mb-10">
            A selection of your most loved products.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image src={missionImage} alt="Product 1 Image" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Product 1</h2>
                <p className="text-gray-600 mt-2">Price: $25.00</p>
                <button className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                  Remove from Favorites
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image src={missionImage} alt="Product 2 Image" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Product 2</h2>
                <p className="text-gray-600 mt-2">Price: $30.00</p>
                <button className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                  Remove from Favorites
                </button>
              </div>
            </div>

            {/* Add more favorite items here */}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 text-lg">
              Ready to purchase your favorite items?
            </p>
            <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
