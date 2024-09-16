import { prisma } from "@/lib/prisma";                    
import { StorageForm } from "../../new/storageForm";
import { PageHeader } from "@/app/admin/adminComponents/PageHeader";

export default async function EditProductPage({
    params: { id },
}: {
  params: { id: string }
}) {
    const storage = await prisma.storage.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit Storage</PageHeader>
        <StorageForm storage={storage} />
        </>
    )

}