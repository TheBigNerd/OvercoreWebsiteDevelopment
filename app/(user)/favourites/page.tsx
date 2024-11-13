import React from 'react';
import FavouriteProducts from './FavouriteProducts';

const Favorites = async () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Favorites</h1>
          <p className="text-center text-lg text-gray-600 mb-10">
            A selection of your most loved products.
          </p>
          
          <FavouriteProducts />
        </div>
      </div>
    </>
  );
};

export default Favorites;
