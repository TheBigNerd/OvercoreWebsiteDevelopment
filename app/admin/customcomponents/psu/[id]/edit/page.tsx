import { prisma } from "@/lib/prisma";                    
import { PSUForm } from "../../new/psuForm";
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

    const PSU = await prisma.pSU.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit PSU</PageHeader>
        <PSUForm PSU={PSU} />
        </>
    )
}