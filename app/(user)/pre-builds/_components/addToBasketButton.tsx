"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

const AddToBasketButton = ({ productId }: { productId: string }) => {
    const [loading , setLoading] = useState(false);
    const { data } = useSession();
    const userId = data?.user.id;

    const addToBasket = async () => {
        setLoading(true)
		try {
			const response = await fetch(`/api/basket?userId=${userId}&productId=${productId}`, {
				method: 'POST',

			})
			if (response.ok) {
				console.log('Product added to basket');
			}
		} catch (error) {
			console.error('Failed to add product to basket', error);
		}   finally {
            setLoading(false)
        }
	}
    return (
        <Button onClick={addToBasket} className="flex-3">
            {loading ? "Adding to Basket..." : "Add to Basket"}
        </Button>
    )

}

export default AddToBasketButton;