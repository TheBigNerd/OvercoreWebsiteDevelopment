// pages/api/checkout.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);
  const { productArray } = req.body;
  let priceInPence: number = 0;

  for (let i = 0; i < productArray.length; i++) {
    const product = productArray[i];
    priceInPence += product.priceInPence;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceInPence,
      currency: 'GBP',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: "An error occurred while processing your payment. Please try again later." });
  }
}