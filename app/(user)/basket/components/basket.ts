import type { NextApiRequest, NextApiResponse } from 'next';
import { basketArray, fetchProductDetails } from "./basketCollect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, productIds } = req.body;

    if (userId) {
      try {
        const basketProductIds = await basketArray(userId);
        console.log('Basket product IDs from user session:', basketProductIds); // Debug log
        if (basketProductIds) {
          const products = await fetchProductDetails(basketProductIds);
          console.log('Products from user session:', products); // Debug log
          return res.status(200).json(products);
        }
      } catch (error) {
        console.error('Error fetching basket products:', error); // Debug log
        return res.status(500).json({ error: 'Failed to fetch basket products' });
      }
    } else if (productIds && Array.isArray(productIds)) {
      try {
        const products = await fetchProductDetails(productIds);
        console.log('Products from cookies:', products); // Debug log
        return res.status(200).json(products);
      } catch (error) {
        console.error('Error fetching product details:', error); // Debug log
        return res.status(500).json({ error: 'Failed to fetch product details' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}