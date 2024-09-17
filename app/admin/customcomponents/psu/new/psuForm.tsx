"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addPSU, updatePSU } from "./psuAdd";
import { useFormState, useFormStatus } from "react-dom";
import { PSU } from "@prisma/client";
import Image from "next/image";

export function PSUForm({ PSU }: {PSU?: PSU | null}) {
    const [error, action] = useFormState(PSU == null ? addPSU : updatePSU.bind(null, PSU.id), {});
    const [priceInPence, setPriceInPence] = useState<number | undefined>(PSU?.priceInPence)
    const [Wattage, setWattage] = useState<number | undefined>(PSU?.wattage)
    const [modular, setModular] = useState<boolean | undefined>(PSU?.modular)
    const [description, setDescription] = useState<string | undefined>(PSU?.description)

    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" required defaultValue={PSU?.title || "" } />
            {error?.title && <div className="text-destructive">{error.title}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInPence">Price In Pence</Label>
            <Input type="number" id="priceInPence" name="priceInPence" required value={priceInPence} onChange={e => setPriceInPence(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{formatCurrency((priceInPence || 0) / 100)}</div>
        {error?.priceInPence && <div className="text-destructive">{error.priceInPence}</div>}
        <div className="space-y-2">
            <Label htmlFor="image">PSU Image</Label>
            <Input type="file" id="image" name="image" required={PSU == null} />
            {PSU != null && <Image src={PSU.imagePath} height="400" width="400" alt="psu image"/> }
            {error?.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="wattage">Wattage</Label>
            <Input type="number" id="wattage" name="wattage" required value={Wattage} onChange={e => setWattage(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{Wattage}W</div>
        {error?.wattage && <div className="text-destructive">{error.wattage}</div>}
        <div className="space-y-2">
            <Label htmlFor="modular">Modular</Label>
            <Input type="checkbox" id="modular" name="modular" checked={modular} onChange={e => setModular(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{modular}</div>
        {error?.modular && <div className="text-destructive">{error.modular}</div>}
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="text-muted-foreground">{description}</div>
        {error?.description && <div className="text-destructive">{error.description}</div>}
        <SubmitButton />
    </form>
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}
