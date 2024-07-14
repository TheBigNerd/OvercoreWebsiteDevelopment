"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { AddProduct } from "../../actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Link from "next/link"
import Image from "next"

export function ProductForm( { product }: { product?: Product | null} ) {
    const [error, action] = useFormState(AddProduct, {});
    const [priceinPence, setPriceinPence] = useState<number | undefined>(product?.priceInPence);

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" required defaultValue={product?.name || "" } />
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="priceinPence">Price In Pence</Label>
                <Input
                    type="number"
                    id="priceinPence"
                    name="priceinPence"
                    required
                    value={priceinPence}
                    onChange={e => setPriceinPence(Number(e.target.value) || undefined)}
                />
                <div className="text-muted-foreground">{formatCurrency((priceinPence || 0) / 100)}</div>
                {error.priceinPence && <div className="text-destructive">{error.priceinPence}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required defaultValue={product?.description || "" } />
                {error.description && <div className="text-destructive">{error.description}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <Input type="file" id="image" name="image" required={product == null} />
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save"}
        </Button>
    );
}
