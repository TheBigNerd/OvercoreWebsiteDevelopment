"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteProduct, toggleProductAvailability } from "../../actions/products"
import { useRouter } from "next/navigation"

export function ActiveToggleDropdownItem({
    id,
    isAvailble,
}: {
    id: string
    isAvailble: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem disabled={isPending} onClick={() => {
        startTransition(async () => {
            await toggleProductAvailability(id, !isAvailble)
            router.refresh()
        })
    }}>{isAvailble ? "Deactivate" : "Activate"}</DropdownMenuItem>
}

export function DeleteDropdownItem({ id, disabled } : { id : string, disabled : boolean})
{
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem disabled={disabled || isPending} onClick={() => {
        startTransition(async () => {
            await deleteProduct(id)
            router.refresh()
        })
    }}>Delete</DropdownMenuItem>
}