"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addMotherboard, updateMotherboard } from "./motherboardAdd";
import { useFormState, useFormStatus } from "react-dom";
import { Motherboard } from "@prisma/client";
import Image from "next/image";

export function MotherboardForm({ motherboard }: {motherboard?: Motherboard | null}) {
    const [error, action] = useFormState(motherboard == null ? addMotherboard : updateMotherboard.bind(null, motherboard.id), {});
    const [priceInPence, setPriceInPence] = useState<number | undefined>(motherboard?.priceInPence)
    const [Wattage, setWattage] = useState<number | undefined>(motherboard?.Wattage)
    const [Socket, setSocket] = useState<string | undefined>(motherboard?.Socket)
    const [memorySlots, setMemorySlots] = useState<number | undefined>(motherboard?.memorySlots)
    const [ATX, setATX] = useState<boolean | undefined>(motherboard?.ATX)
    const [EATX, setEATX] = useState<boolean | undefined>(motherboard?.EATX)
    const [MicroATX, setMicroATX] = useState<boolean | undefined>(motherboard?.MicroATX)
    const [MiniITX, setMiniITX] = useState<boolean | undefined>(motherboard?.MiniITX)
    const [XLATX, setXLATX] = useState<boolean | undefined>(motherboard?.XLATX)
    const [wifi, setWifi] = useState<boolean | undefined>(motherboard?.wifi)

    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" required defaultValue={motherboard?.title || "" } />
            {error?.title && <div className="text-destructive">{error.title}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInPence">Price In Pence</Label>
            <Input type="number" id="priceInPence" name="priceInPence" required value={priceInPence} onChange={e => setPriceInPence(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{formatCurrency((priceInPence || 0) / 100)}</div>
        {error?.priceInPence && <div className="text-destructive">{error.priceInPence}</div>}
        <div className="space-y-2">
            <Label htmlFor="image">Motherboard Image</Label>
            <Input type="file" id="image" name="image" required={motherboard == null} />
            {motherboard != null && <Image src={motherboard.imagePath} height="400" width="400" alt="motherboard image"/> }
            {error?.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="Wattage">Wattage</Label>
            <Input type="number" id="Wattage" name="Wattage" required value={Wattage} onChange={e => setWattage(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{Wattage}W</div>
        {error?.Wattage && <div className="text-destructive">{error.Wattage}</div>}
        <div className="space-y-2">
            <Label htmlFor="Socket">Socket</Label>
            <Input type="text" id="Socket" name="Socket" required value={Socket} onChange={e => setSocket(e.target.value)} />
        </div>
        <div className="text-muted-foreground">{Socket}</div>
        {error?.Socket && <div className="text-destructive">{error.Socket}</div>}
        <div className="space-y-2">
            <Label htmlFor="memorySlots">Memory Slots</Label>
            <Input type="number" id="memorySlots" name="memorySlots" required value={memorySlots} onChange={e => setMemorySlots(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{memorySlots}</div>
        {error?.memorySlots && <div className="text-destructive">{error.memorySlots}</div>}
        <div className="space-y-2">
            <Label htmlFor="ATX">ATX</Label>
            <Input type="checkbox" id="ATX" name="ATX" checked={ATX} onChange={e => setATX(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{ATX}</div>
        {error?.ATX && <div className="text-destructive">{error.ATX}</div>}
        <div className="space-y-2">
            <Label htmlFor="EATX">EATX</Label>
            <Input type="checkbox" id="EATX" name="EATX" checked={EATX} onChange={e => setEATX(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{EATX}</div>
        {error?.EATX && <div className="text-destructive">{error.EATX}</div>}
        <div className="space-y-2">
            <Label htmlFor="MicroATX">MicroATX</Label>
            <Input type="checkbox" id="MicroATX" name="MicroATX" checked={MicroATX} onChange={e => setMicroATX(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{MicroATX}</div>
        {error?.MicroATX && <div className="text-destructive">{error.MicroATX}</div>}
        <div className="space-y-2">
            <Label htmlFor="MiniITX">MiniITX</Label>
            <Input type="checkbox" id="MiniITX" name="MiniITX" checked={MiniITX} onChange={e => setMiniITX(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{MiniITX}</div>
        {error?.MiniITX && <div className="text-destructive">{error.MiniITX}</div>}
        <div className="space-y-2">
            <Label htmlFor="XLATX">XLATX</Label>
            <Input type="checkbox" id="XLATX" name="XLATX" checked={XLATX} onChange={e => setXLATX(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{XLATX}</div>
        {error?.XLATX && <div className="text-destructive">{error.XLATX}</div>}
        <div className="space-y-2">
            <Label htmlFor="wifi">wifi</Label>
            <Input type="checkbox" id="wifi" name="wifi" checked={wifi} onChange={e => setWifi(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{wifi}</div>
        {error?.wifi && <div className="text-destructive">{error.wifi}</div>}
        <div className="space-y-2">
            <Label htmlFor="memorySpeed">Memory Speed</Label>
            <Input type="text" id="memorySpeed" name="memorySpeed" required defaultValue={motherboard?.memorySpeed.join(", ")} />
        </div>
        <div className="text-muted-foreground">{motherboard?.memorySpeed.join(", ")} MHz</div>
        {error?.memorySpeed && <div className="text-destructive">{error.memorySpeed}</div>}
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={motherboard?.description || ""} />
            {error?.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <SubmitButton />
    </form>
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}
