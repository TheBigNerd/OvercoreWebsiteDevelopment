import { prisma } from "@/lib/prisma";                    
import { MotherboardForm } from "../../new/motherboardForm"; 
import { PageHeader } from "@/app/admin/adminComponents/PageHeader";

export default async function EditProductPage(
    props: {
      params: Promise<{ id: string }>
    }
) {
    const params = await props.params;

    const {
        id
    } = params;

    const motherboard = await prisma.motherboard.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit Motherboard</PageHeader>
        <MotherboardForm motherboard={motherboard} />
        </>
    )
}