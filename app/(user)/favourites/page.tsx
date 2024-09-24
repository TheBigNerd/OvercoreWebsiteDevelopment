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

          <div className="mt-12 text-center">
            <p className="text-gray-700 text-lg">
              Ready to purchase your favorite items?
            </p>
            <button className="mt-4 bg-slate-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-slate-400">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
