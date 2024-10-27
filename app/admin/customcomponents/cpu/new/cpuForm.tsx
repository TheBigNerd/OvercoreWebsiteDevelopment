"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useActionState, useState } from "react";
import { addCpu, updateCPU } from "./cpuAdd";
import { useFormStatus } from "react-dom";
import { CPU } from "@prisma/client";
import Image from "next/image";

export function CpuForm({ cpu }: {cpu?: CPU | null}) {
    const [error, action] = useActionState(cpu == null ? addCpu : updateCPU.bind(null, cpu.id), {});
    const [priceInPence, setPriceInPence] = useState<number | undefined>(cpu?.priceInPence)
    const [Wattage, setWattage] = useState<number | undefined>(cpu?.Wattage)
    const [Socket, setSocket] = useState<string | undefined>(cpu?.Socket)
    const [IntegratedGraphics, setIntegratedGraphics] = useState<boolean | undefined>(cpu?.IntegratedGraphics)
    const [IntegratedCooler, setIntegratedCooler] = useState<boolean | undefined>(cpu?.IntegratedCooler)

    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" required defaultValue={cpu?.title || "" } />
            {error?.title && <div className="text-destructive">{error.title}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInPence">Price In Pence</Label>
            <Input type="number" id="priceInPence" name="priceInPence" required value={priceInPence} onChange={e => setPriceInPence(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{formatCurrency((priceInPence || 0) / 100)}</div>
        {error?.priceInPence && <div className="text-destructive">{error.priceInPence}</div>}
        <div className="space-y-2">
            <Label htmlFor="image">CPU Image</Label>
            <Input type="file" id="image" name="image" required={cpu == null} />
            {cpu != null && <Image src={cpu.imagePath} height="400" width="400" alt="cpu image"/> }
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
            <Label htmlFor="IntegratedGraphics">Integrated Graphics</Label>
            <Input type="checkbox" id="IntegratedGraphics" name="IntegratedGraphics" checked={IntegratedGraphics} onChange={e => setIntegratedGraphics(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{IntegratedGraphics}</div>
        {error?.IntegratedGraphics && <div className="text-destructive">{error.IntegratedGraphics}</div>}
        <div className="space-y-2">
            <Label htmlFor="IntegratedCooler">Integrated Cooler</Label>
            <Input type="checkbox" id="IntegratedCooler" name="IntegratedCooler" checked={IntegratedCooler} onChange={e => setIntegratedCooler(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{IntegratedCooler}</div>
        {error?.IntegratedCooler && <div className="text-destructive">{error.IntegratedCooler}</div>}
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={cpu?.description || ""} />
            {error?.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <SubmitButton />
    </form>
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}
