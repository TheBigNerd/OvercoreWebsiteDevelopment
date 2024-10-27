"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useActionState, useState } from "react";
import { addStorage, updateStorage } from "./storageAdd";
import { useFormStatus } from "react-dom";
import { storage } from "@prisma/client";
import Image from "next/image";

export function StorageForm({ storage }: {storage?: storage | null}) {
    const [error, action] = useActionState(storage == null ? addStorage : updateStorage.bind(null, storage.id), {});
    const [priceInPence, setPriceInPence] = useState<number | undefined>(storage?.priceInPence)
    const [Wattage, setWattage] = useState<number | undefined>(storage?.wattage)
    const [capacity, setCapacity] = useState<number | undefined>(storage?.capacity)

    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" required defaultValue={storage?.title || "" } />
            {error?.title && <div className="text-destructive">{error.title}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInPence">Price In Pence</Label>
            <Input type="number" id="priceInPence" name="priceInPence" required value={priceInPence} onChange={e => setPriceInPence(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{formatCurrency((priceInPence || 0) / 100)}</div>
        {error?.priceInPence && <div className="text-destructive">{error.priceInPence}</div>}
        <div className="space-y-2">
            <Label htmlFor="image">Storage Image</Label>
            <Input type="file" id="image" name="image" required={storage == null} />
            {storage != null && <Image src={storage.imagePath} height="400" width="400" alt="storage image"/> }
            {error?.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="wattage">Wattage</Label>
            <Input type="number" id="wattage" name="wattage" required value={Wattage} onChange={e => setWattage(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{Wattage}W</div>
        {error?.wattage && <div className="text-destructive">{error.wattage}</div>}
        <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input type="number" id="capacity" name="capacity" required value={capacity} onChange={e => setCapacity(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{capacity}GB</div>
        {error?.capacity && <div className="text-destructive">{error.capacity}</div>}
        <div className="space-y-2">
            <Label htmlFor="connection">Connection</Label>
            <Input type="text" id="connection" name="connection" required defaultValue={storage?.connection || "" } />
            {error?.connection && <div className="text-destructive">{error.connection}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={storage?.description || ""} />
            {error?.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <SubmitButton />
    </form>
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}