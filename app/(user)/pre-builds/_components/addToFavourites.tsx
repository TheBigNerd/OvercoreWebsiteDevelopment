"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const AddToFavourites = ({ productId }: { productId: string }) => {
    const [loading , setLoading] = useState(false);
    const { data } = useSession();
    const userId = data?.user.id;
    const router = useRouter();

    const AddToFavourites = async () => {
        setLoading(true)
		try {
			const response = await fetch(`/api/favourites?userId=${userId}&productId=${productId}`, {
				method: 'POST',

			})
			if (response.ok) {
				console.log('Product added to favourites');
			} else if (response.status === 405) {
                router.push("/auth/login")
            }
		} catch (error) {
			console.error('Failed to add product to favourites', error);
		}   finally {
            setLoading(false)
        }
	}
    return (
        <Button onClick={AddToFavourites} className="flex-3">
            {loading ? "Adding..." : "Favourite"}
        </Button>
    )

}

export default AddToFavourites;