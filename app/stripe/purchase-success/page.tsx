import CheckoutProduct from "@/app/checkout/_checkoutcomponents/CheckoutProduct";
import { Elements } from "@stripe/react-stripe-js";

export default function SuccessPage() {
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