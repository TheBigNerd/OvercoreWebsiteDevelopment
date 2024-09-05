"use client"

import { AddressElement, Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutProduct from "./CheckoutProduct"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/formatters"
import { FormEvent, useState } from "react"

type CheckoutFormProps = {
    product: {
        imagePath: string
        name: string
        priceInPence: number
        description: string
    }
    clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export function CheckoutForm({ product, clientSecret}: CheckoutFormProps){
    return(
    <div className="max-w-5xl w-full mx-auto space-y-8">
        <div className="flex gap-4 items-center">
            <div className="py-8">
            <CheckoutProduct name={product.name} priceInPence={product.priceInPence} imagePath={product.imagePath}/>
            </div>
        </div>
     <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form priceInPence={product.priceInPence}/>
    </Elements>
    </div>
    )
}



function Form({ priceInPence}: { priceInPence: number }) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()

    function handleSubmit(e: FormEvent){
        e.preventDefault()
    
        if (stripe == null || elements == null) return
    
        setIsLoading(true)

        stripe.confirmPayment({ elements, confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`
        },
     }).then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
            setErrorMessage(error.message)
        } else {
            setErrorMessage("An unknown error occured")
        }
     }).finally(() => setIsLoading(false))
    }
    return (
    <form onSubmit={handleSubmit}>
        <Card>
            <CardHeader>
                <CardTitle>Checkout</CardTitle>
                {errorMessage && <CardDescription className="text-destructive">{errorMessage}</CardDescription>}
            </CardHeader>
            <CardContent>
            <PaymentElement />
            <div className="mt-4">
            <LinkAuthenticationElement/>
            </div>
            <div className="mt-4">
            <AddressElement options={{mode: 'shipping'}} />
            </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" size="lg" disabled={stripe == null || elements == null || isLoading}>
                    {isLoading ? "Purchasing..." : 
                    `Purchase - ${formatCurrency(priceInPence/100)}`}
                </Button>
            </CardFooter>
        </Card>
    </form>

    )
}
