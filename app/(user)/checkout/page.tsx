import Stripe from "stripe"
import { CheckoutForm } from "./_checkoutcomponents/CheckoutForm"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const product = localStorage.getItem("basket")

export default async function CheckoutPage() {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: product!.priceInPence,
        currency: "GBP"
    })
    if (paymentIntent.client_secret == null) {
        throw Error("Stripe failed to create payment intent")
    }

    return (
        <CheckoutForm product={product!} clientSecret={paymentIntent.client_secret} />
    )
}