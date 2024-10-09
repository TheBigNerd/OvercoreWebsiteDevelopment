import React from 'react';
import OrderDisplay from './OrderDisplay';


const Orders = () => {
    return (
      <>
  
            <OrderDisplay/>

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