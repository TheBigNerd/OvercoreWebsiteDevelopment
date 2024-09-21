
import { basketArray, fetchProductDetails } from "./basketCollect";

export async function POST(req: Request) {
	const data = await req.json();
	const { userId, productIds } = data;
	
	if (userId) {
		try {
			const basketProductIds = await basketArray(userId);
			console.log('Basket product IDs from user session:', basketProductIds); // Debug log
			if (basketProductIds) {
				const products = await fetchProductDetails(basketProductIds);
				console.log('Products from user session:', products); // Debug log
				return Response.json(products);
			}
		} catch (error) {
			console.error('Error fetching basket products:', error); // Debug log
			return Response.json({ error: 'Failed to fetch basket products', status: 500 });
		}
	} else if (productIds && Array.isArray(productIds)) {
		try {
			const products = await fetchProductDetails(productIds);
			console.log('Products from cookies:', products); // Debug log
			return Response.json(products);
		} catch (error) {
			console.error('Error fetching product details:', error); // Debug log
			return Response.json({ error: 'Failed to fetch product details', status: 500 });
		}
	} else {
		return Response.json({ error: 'Invalid request', status: 400 });
	}
}