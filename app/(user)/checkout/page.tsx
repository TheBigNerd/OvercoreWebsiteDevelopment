import Stripe from "stripe"
import { CheckoutForm } from "./_checkoutcomponents/CheckoutForm"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const product = await prisma.product.findFirst({
    where: { id: `47110084-8fd8-478b-a526-78e162da4309`}
})

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