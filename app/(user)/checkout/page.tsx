"use client"

import Stripe from "stripe"
import { CheckoutForm } from "./_checkoutcomponents/CheckoutForm"
import { useEffect, useState } from "react"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default function CheckoutPage() {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const storedProducts = localStorage.getItem("basket")
        if (storedProducts) {
            const parsedProduct = JSON.parse(storedProducts);
            setProduct(parsedProduct);
            fetch(`/api/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsedProduct)
            })
            .then((response) => response.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
        }
    }, [])

    if (!product || !clientSecret) {
        return <div>Loading...</div>
    }
    return (
        <CheckoutForm product={product!} clientSecret={clientSecret} />
    )
}