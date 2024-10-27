"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useActionState, useState } from "react";
import { addCpuCooler, updateCpuCooler } from "./cpuCoolerAdd";
import { useFormStatus } from "react-dom";
import { cpuCooler } from "@prisma/client";
import Image from "next/image";

export function CpuCoolerForm({ cpuCooler }: {cpuCooler?: cpuCooler | null}) {
    const [error, action] = useActionState(cpuCooler == null ? addCpuCooler : updateCpuCooler.bind(null, cpuCooler.id), {});
    const [priceInPence, setPriceInPence] = useState<number | undefined>(cpuCooler?.priceInPence)
    const [wattage, setwattage] = useState<number | undefined>(cpuCooler?.wattage)
    const [AM4, setAM4] = useState<boolean | undefined>(cpuCooler?.AM4)
    const [AM5, setAM5] = useState<boolean | undefined>(cpuCooler?.AM5)
    const [LGA1151, setLGA1151] = useState<boolean | undefined>(cpuCooler?.LGA1151)
    const [LGA1200, setLGA1200] = useState<boolean | undefined>(cpuCooler?.LGA1200)
    const [LGA1700, setLGA1700] = useState<boolean | undefined>(cpuCooler?.LGA1700)

    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" required defaultValue={cpuCooler?.title || "" } />
            {error?.title && <div className="text-destructive">{error.title}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInPence">Price In Pence</Label>
            <Input type="number" id="priceInPence" name="priceInPence" required value={priceInPence} onChange={e => setPriceInPence(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{formatCurrency((priceInPence || 0) / 100)}</div>
        {error?.priceInPence && <div className="text-destructive">{error.priceInPence}</div>}
        <div className="space-y-2">
            <Label htmlFor="image">CPU Cooler Image</Label>
            <Input type="file" id="image" name="image" required={cpuCooler == null} />
            {cpuCooler != null && <Image src={cpuCooler.imagePath} height="400" width="400" alt="cpu cooler image"/> }
            {error?.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="wattage">Wattage</Label>
            <Input type="number" id="wattage" name="wattage" required value={wattage} onChange={e => setwattage(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{wattage}W</div>
        {error?.wattage && <div className="text-destructive">{error.wattage}</div>}
        <div className="space-y-2">
            <Label htmlFor="AM4">AM4</Label>
            <Input type="checkbox" id="AM4" name="AM4" checked={AM4} onChange={e => setAM4(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{AM4}</div>
        {error?.AM4 && <div className="text-destructive">{error.AM4}</div>}
        <div className="space-y-2">
            <Label htmlFor="AM5">AM5</Label>
            <Input type="checkbox" id="AM5" name="AM5" checked={AM5} onChange={e => setAM5(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{AM5}</div>
        {error?.AM5 && <div className="text-destructive">{error.AM5}</div>}
        <div className="space-y-2">
            <Label htmlFor="LGA1151">LGA1151</Label>
            <Input type="checkbox" id="LGA1151" name="LGA1151" checked={LGA1151} onChange={e => setLGA1151(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{LGA1151}</div>
        {error?.LGA1151 && <div className="text-destructive">{error.LGA1151}</div>}
        <div className="space-y-2">
            <Label htmlFor="LGA1200">LGA1200</Label>
            <Input type="checkbox" id="LGA1200" name="LGA1200" checked={LGA1200} onChange={e => setLGA1200(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{LGA1200}</div>
        {error?.LGA1200 && <div className="text-destructive">{error.LGA1200}</div>}
        <div className="space-y-2">
            <Label htmlFor="LGA1700">LGA1700</Label>
            <Input type="checkbox" id="LGA1700" name="LGA1700" checked={LGA1700} onChange={e => setLGA1700(e.target.checked)} />
        </div>
        <div className="text-muted-foreground">{LGA1700}</div>
        {error?.LGA1700 && <div className="text-destructive">{error.LGA1700}</div>}
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={cpuCooler?.description || ""} />
            {error?.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <SubmitButton />
    </form>
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}