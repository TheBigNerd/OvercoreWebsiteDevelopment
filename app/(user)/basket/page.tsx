import React from 'react';
import BasketContainer from "./components/basketContainer"

const Basket = () => {
	return (
		<div className="text-light py-5">
			<div className="mb-5">
				<h1 className="text-center text-5xl">Shopping Basket</h1>
				<p className="text-center text-xl text-gray-500">
					Review your selected items and proceed to checkout.
				</p>
			</div>
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-center pt-3 space-y-4 md:space-y-0 md:space-x-4">
					<BasketContainer/>
				</div>
			</div>
		</div>
	);
}

export default Basket;
