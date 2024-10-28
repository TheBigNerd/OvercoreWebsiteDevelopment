import { prisma } from "@/lib/prisma";                    
import { MotherboardForm } from "../../new/motherboardForm"; 
import { PageHeader } from "@/app/admin/adminComponents/PageHeader";

export default async function EditProductPage({
    params: { id },
}: {
  params: { id: string }
}) {

    const motherboard = await prisma.motherboard.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit Motherboard</PageHeader>
        <MotherboardForm motherboard={motherboard} />
        </>
    )
}