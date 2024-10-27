import { prisma } from "@/lib/prisma";                    
import { MemoryForm } from "../../new/memoryForm";
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

    const memory = await prisma.memory.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit Memory</PageHeader>
        <MemoryForm memory={memory} />
        </>
    )
}