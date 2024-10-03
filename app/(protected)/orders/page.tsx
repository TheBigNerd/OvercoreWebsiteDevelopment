import React from 'react';
import OrdersContainer from '@/app/(protected)/orders/OrdersContainer'


const Orders = () => {
    return (
      <>
  
        <div className="mx-auto  py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Your Orders</h1>
            <p className="text-center text-lg text-gray-600 mb-6">
              View the details of your recent purchases.
            </p>
            <OrdersContainer />
           </div>
          </div>
  
            <div className="text-center">
              <p className="text-gray-700 text-lg">
                Need help with your orders?
              </p>
              <button className="mt-4 bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-700">
                Contact Support
              </button>
            </div>
      </>
    );
  };
  
  export default Orders;