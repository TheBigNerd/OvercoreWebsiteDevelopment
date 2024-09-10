import Stripe from "stripe"
import { CheckoutForm } from "./_checkoutcomponents/CheckoutForm"
import { prisma } from "@/lib/prisma"
import Navbar from "../components/Navigation/Navbar"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const product = await prisma.product.findFirst({
    where: { id: `14e02bc3-8bc7-4205-83c3-f707f4142dae`}
})

export default async function CheckoutPage() {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: product!.priceInPence,
        currency: "GBP"
    })
    if (paymentIntent.client_secret == null) {
        throw Error("Stripe failed to create payment intent")
    }

    return(
        <><Navbar />
        <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />
        </>
    )
}