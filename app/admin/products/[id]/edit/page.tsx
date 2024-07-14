import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../../adminComponents/PageHeader";
import { ProductForm } from "../../productComponents/ProductForm";

export default async function EditProductPage({
    params: { id },
}: {
  params: { id: string }
}) {
    const product = await prisma.product.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit Product</PageHeader>
        <ProductForm product={product} />
        </>
    )

}