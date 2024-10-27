"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useActionState, useState } from "react";
import { addMemory, updateMemory } from "./MemoryAdd";
import { useFormStatus } from "react-dom";
import { memory } from "@prisma/client";
import Image from "next/image";

export function MemoryForm({ memory }: {memory?: memory | null}) {
    const [error, action] = useActionState(memory == null ? addMemory : updateMemory.bind(null, memory.id), {});
    const [priceInPence, setPriceInPence] = useState<number | undefined>(memory?.priceInPence)
    const [Wattage, setWattage] = useState<number | undefined>(memory?.Wattage)
    const [numberOfSticks, setNumberOfSticks] = useState<number | undefined>(memory?.numberOfSticks)
    const [speed, setSpeed] = useState<number | undefined>(memory?.speed)
    const [capacity, setCapacity] = useState<number | undefined>(memory?.capacity)

    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" required defaultValue={memory?.title || "" } />
            {error?.title && <div className="text-destructive">{error.title}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInPence">Price In Pence</Label>
            <Input type="number" id="priceInPence" name="priceInPence" required value={priceInPence} onChange={e => setPriceInPence(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{formatCurrency((priceInPence || 0) / 100)}</div>
        {error?.priceInPence && <div className="text-destructive">{error.priceInPence}</div>}
        <div className="space-y-2">
            <Label htmlFor="image">Memory Image</Label>
            <Input type="file" id="image" name="image" required={memory == null} />
            {memory != null && <Image src={memory.imagePath} height="400" width="400" alt="memory image"/> }
            {error?.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="Wattage">Wattage</Label>
            <Input type="number" id="Wattage" name="Wattage" required value={Wattage} onChange={e => setWattage(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{Wattage}W</div>
        {error?.Wattage && <div className="text-destructive">{error.Wattage}</div>}
        <div className="space-y-2">
            <Label htmlFor="numberOfSticks">Number of Sticks</Label>
            <Input type="number" id="numberOfSticks" name="numberOfSticks" required value={numberOfSticks} onChange={e => setNumberOfSticks(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{numberOfSticks}</div>
        {error?.numberOfSticks && <div className="text-destructive">{error.numberOfSticks}</div>}
        <div className="space-y-2">
            <Label htmlFor="speed">Speed</Label>
            <Input type="number" id="speed" name="speed" required value={speed} onChange={e => setSpeed(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{speed}MHz</div>
        {error?.speed && <div className="text-destructive">{error.speed}</div>}
        <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input type="number" id="capacity" name="capacity" required value={capacity} onChange={e => setCapacity(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{capacity}GB</div>
        {error?.capacity && <div className="text-destructive">{error.capacity}</div>}
        <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={memory?.description || ""} />
            {error?.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <SubmitButton />
    </form>
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}
