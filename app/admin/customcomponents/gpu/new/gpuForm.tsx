"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addGpu, updateGPU } from "./gpuAdd";
import { useFormState, useFormStatus } from "react-dom";
import { Gpu } from "@prisma/client";
import Image from "next/image";

export function GpuForm({ gpu }: {gpu?: Gpu | null}) {
    const [error, action] = useFormState(gpu == null ? addGpu : updateGPU.bind(null, gpu.id), {});
    const [priceInPence, setPriceInPence] = useState<number | undefined>(gpu?.priceInPence)
    const [Wattage, setWattage] = useState<number | undefined>(gpu?.Wattage)
    const [width, setWidth] = useState<number | undefined>(gpu?.width)

    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" required defaultValue={gpu?.title || "" } />
            {error?.title && <div className="text-destructive">{error.title}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInPence">Price In Pence</Label>
            <Input type="number" id="priceInPence" name="priceInPence" required value={priceInPence} onChange={e => setPriceInPence(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{formatCurrency((priceInPence || 0) / 100)}</div>
        {error?.priceInPence && <div className="text-destructive">{error.priceInPence}</div>}
        <div className="space-y-2">
            <Label htmlFor="image">GPU Image</Label>
            <Input type="file" id="image" name="image" required={gpu == null} />
            {gpu != null && <Image src={gpu.imagePath} height="400" width="400" alt="gpu image"/> }
            {error?.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="Wattage">Wattage</Label>
            <Input type="number" id="Wattage" name="Wattage" required value={Wattage} onChange={e => setWattage(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{Wattage}W</div>
        {error?.Wattage && <div className="text-destructive">{error.Wattage}</div>}
        <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input type="number" id="width" name="width" required value={width} onChange={e => setWidth(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{width}mm</div>
        {error?.width && <div className="text-destructive">{error.width}</div>}
        <SubmitButton />
    </form>
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}