// pages/api/checkout.ts
import Stripe from 'stripe';
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
	const productArray = await req.json();
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
		
		return NextResponse.json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.error('Error creating payment intent:', error);
		return NextResponse.json({ error: "An error occurred while processing your payment. Please try again later." }, { status: 500 });
	}
}