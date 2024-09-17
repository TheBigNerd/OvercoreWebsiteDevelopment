"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteProduct, toggleProductAvailability } from "../../actions/products"
import { useRouter } from "next/navigation"
import { deleteCase } from "../case/new/caseAdd"

export function DeleteCaseItem({
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
            await deleteCase(id)
            router.refresh()
        })
    }}>Delete</DropdownMenuItem>
}