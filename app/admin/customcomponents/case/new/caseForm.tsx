"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useActionState, useState } from "react";
import { addCase, updateCase } from "./caseAdd";
import { useFormStatus } from "react-dom";
import { Case } from "@prisma/client";
import Image from "next/image";

export function CaseForm({ Case }: {Case?: Case | null}) {
    const [error, action] = useActionState(Case == null ? addCase : updateCase.bind(null, Case.id), {});
    const [priceInPence, setPriceInPence] = useState<number | undefined>(Case?.priceInPence)

    return <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" required defaultValue={Case?.title || "" } />
            {error?.title && <div className="text-destructive">{error.title}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInPence">Price In Pence</Label>
            <Input type="number" id="priceInPence" name="priceInPence" required value={priceInPence} onChange={e => setPriceInPence(Number(e.target.value) || undefined)} />
        </div>
        <div className="text-muted-foreground">{formatCurrency((priceInPence || 0) / 100)}</div>
        {error?.priceInPence && <div className="text-destructive">{error.priceInPence}</div>}
        <div className="space-y-2">
            <Label htmlFor="image">Case Image</Label>
            <Input type="file" id="image" name="image" required={Case == null} />
            {Case != null && <Image src={Case.imagePath} height="400" width="400" alt="case image"/> }
            {error?.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="ATX">ATX</Label>
            <Input type="checkbox" id="ATX" name="ATX" defaultChecked={Case?.ATX} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="EATX">EATX</Label>
            <Input type="checkbox" id="EATX" name="EATX" defaultChecked={Case?.EATX} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="MicroATX">MicroATX</Label>
            <Input type="checkbox" id="MicroATX" name="MicroATX" defaultChecked={Case?.MicroATX} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="MiniITX">MiniITX</Label>
            <Input type="checkbox" id="MiniITX" name="MiniITX" defaultChecked={Case?.MiniITX} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="XLATX">XLATX</Label>
            <Input type="checkbox" id="XLATX" name="XLATX" defaultChecked={Case?.XLATX} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={Case?.description || ""} />
            {error?.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <SubmitButton />
    </form>
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}