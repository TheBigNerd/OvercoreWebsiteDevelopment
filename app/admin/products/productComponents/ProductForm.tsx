"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useActionState, useState } from "react";
import { addProduct, updateProduct } from "../../actions/products";
import { useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useActionState(product == null ? addProduct : updateProduct.bind(null, product.id), {});
  const [priceInPence, setPriceInPence] = useState<number | undefined>(product?.priceInPence);

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required defaultValue={product?.name || ""} />
        {error?.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInPence">Price In Pence</Label>
        <Input
          type="number"
          id="priceInPence"
          name="priceInPence"
          required
          value={priceInPence}
          onChange={(e) => setPriceInPence(Number(e.target.value) || undefined)}
        />
      </div>
      <div className="text-muted-foreground">{formatCurrency((priceInPence || 0) / 100)}</div>
      {error?.priceInPence && <div className="text-destructive">{error.priceInPence}</div>}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required defaultValue={product?.description || ""} />
        {error?.description && <div className="text-destructive">{error.description}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image #1</Label>
        <Input type="file" id="image" name="image" required={product == null} />
        {product != null && <Image src={product.imagePath[0]} height="400" width="400" alt="product image" />}
        {error?.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image2">Image #2</Label>
        <Input type="file" id="image2" name="image2" />
        {product != null && <Image src={product.imagePath[1]} height="400" width="400" alt="product image" />}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image3">Image #3</Label>
        <Input type="file" id="image3" name="image3" />
        {product != null && <Image src={product.imagePath[2]} height="400" width="400" alt="product image" />}
      </div>
      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Input type="text" id="brand" name="brand" required defaultValue={product?.brand || ""} />
        {error?.brand && <div className="text-destructive">{error.brand}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="isFeatured">Featured?</Label>
        <Input type="checkbox" id="isFeatured" name="isFeatured" defaultChecked={product?.isFeatured} />
        {error?.isFeatured && <div className="text-destructive">{error.isFeatured}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="cpuModel">CPU Model</Label>
        <Input type="text" id="cpuModel" name="cpuModel" required defaultValue={product?.cpuModel || ""} />
        {error?.cpuModel && <div className="text-destructive">{error.cpuModel}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="gpuModel">GPU Model</Label>
        <Input type="text" id="gpuModel" name="gpuModel" required defaultValue={product?.gpuModel || ""} />
        {error?.gpuModel && <div className="text-destructive">{error.gpuModel}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="colour">Colour</Label>
        <Input type="text" id="colour" name="colour" required defaultValue={product?.colour || ""} />
        {error?.colour && <div className="text-destructive">{error.colour}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="caseSize">Case Size</Label>
        <Input type="text" id="caseSize" name="caseSize" required defaultValue={product?.caseSize || ""} />
        {error?.caseSize && <div className="text-destructive">{error.caseSize}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="memorySize">Memory Size</Label>
        <Input type="text" id="memorySize" name="memorySize" required defaultValue={product?.memorySize || ""} />
        {error?.memorySize && <div className="text-destructive">{error.memorySize}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="memoryType">Memory Type</Label>
        <Input type="text" id="memoryType" name="memoryType" required defaultValue={product?.memoryType || ""} />
        {error?.memoryType && <div className="text-destructive">{error.memoryType}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="storageType">Storage Type</Label>
        <Input type="text" id="storageType" name="storageType" required defaultValue={product?.storageType || ""} />
        {error?.storageType && <div className="text-destructive">{error.storageType}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="totalStorage">Total Storage</Label>
        <Input type="text" id="totalStorage" name="totalStorage" required defaultValue={product?.totalStorage || ""} />
        {error?.totalStorage && <div className="text-destructive">{error.totalStorage}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="connectivity">Connectivity</Label>
        <Input type="text" id="connectivity" name="connectivity" required defaultValue={product?.connectivity || ""} />
        {error?.connectivity && <div className="text-destructive">{error.connectivity}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="coolingMethod">Cooling Method</Label>
        <Input type="text" id="coolingMethod" name="coolingMethod" required defaultValue={product?.coolingMethod || ""} />
        {error?.coolingMethod && <div className="text-destructive">{error.coolingMethod}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="tagline">Tagline</Label>
        <Input type="text" id="tagline" name="tagline" required defaultValue={product?.tagline || ""} />
        {error?.tagline && <div className="text-destructive">{error.tagline}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>;
}