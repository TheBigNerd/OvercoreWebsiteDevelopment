import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../../adminComponents/PageHeader";
import { ProductForm } from "../../productComponents/ProductForm";

export default async function EditProductPage(
    props: {
      params: Promise<{ id: string }>
    }
) {
    const params = await props.params;

    const {
        id
    } = params;

    const product = await prisma.product.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit Product</PageHeader>
        <ProductForm product={product} />
        </>
    )
}