import { prisma } from "@/lib/prisma";                    
import { StorageForm } from "../../new/storageForm";
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

    const storage = await prisma.storage.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit Storage</PageHeader>
        <StorageForm storage={storage} />
        </>
    )
}