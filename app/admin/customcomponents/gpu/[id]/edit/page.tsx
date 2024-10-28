import { prisma } from "@/lib/prisma";                    
import { GpuForm } from "../../new/gpuForm"; 
import { PageHeader } from "@/app/admin/adminComponents/PageHeader";

export default async function EditProductPage({
    params: { id },
}: {
  params: { id: string }
}) {
    const GPU = await prisma.gpu.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit GPU</PageHeader>
        <GpuForm gpu={GPU} />
        </>
    )
}