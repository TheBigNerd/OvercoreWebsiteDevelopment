import { prisma } from "@/lib/prisma";                    
import { PSUForm } from "../../new/psuForm";
import { PageHeader } from "@/app/admin/adminComponents/PageHeader";

export default async function EditProductPage({
    params: { id },
}: {
  params: { id: string }
}) {
    const PSU = await prisma.pSU.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit PSU</PageHeader>
        <PSUForm PSU={PSU} />
        </>
    )

}