import Navbar from "@/app/(user)/_components/Navbar";
import Footer from "@/app/(user)/_components/Footer";
import Image from "next/image";
import Product from "@/app/(user)/_components/receiptComponent"; // Import the new Product component
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function SuccessPage() {
    return (
        <div>
            <Navbar />

            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <Image src={"/images/tick.png"} alt="Success Tick" width={100} height={100} />
                <h1 className="text-3xl font-bold mt-4">Payment Successful!</h1>
                <p className="text-lg mt-2">Thank you for your purchase. Your order has been successfully processed.</p>

                {/* Return to Shop Button */}
                <Button  className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300">
                    <Link href="/">
                    Return to Home   
                    </Link>
                  
                </ Button>

                {/* Receipt Section */}
                <div className="mt-10 p-6 border border-gray-300 rounded-lg shadow-md max-w-lg w-full">
                    <h2 className="text-2xl font-bold mb-4">Order Receipt</h2>

                    {/* Use the Product component here */}
                    <Product
                        imageSrc={"/images/Pawel.jpg"}
                        name="Product Name 1"
                        description="This is a description of the first product."
                        price={99.99}
                    />
                    <Product
                        imageSrc={"/images/Pawel.jpg"}
                        name="Product Name 2"
                        description="This is a description of the second product."
                        price= {45.99}
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}
