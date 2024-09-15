"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteProduct, toggleProductAvailability } from "../../actions/products"
import { useRouter } from "next/navigation"
import { deleteStorage } from "./new/storageAdd"

export function DeleteStorageItem({
    id,
    disabled
}: {
    id: string
    disabled: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem disabled={disabled || isPending} onClick={() => {
        startTransition(async () => {
            await deleteStorage(id)
            router.refresh()
        })
    }}>Delete</DropdownMenuItem>
}