import { prisma } from "@/lib/prisma";                    
import { MemoryForm } from "../../new/memoryForm";
import { PageHeader } from "@/app/admin/adminComponents/PageHeader";

export default async function EditProductPage({
    params: { id },
}: {
  params: { id: string }
}) {
    const memory = await prisma.memory.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit Memory</PageHeader>
        <MemoryForm memory={memory} />
        </>
    )

}