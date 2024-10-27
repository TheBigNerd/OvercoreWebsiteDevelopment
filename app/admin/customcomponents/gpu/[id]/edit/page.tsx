import { prisma } from "@/lib/prisma";                    
import { GpuForm } from "../../new/gpuForm"; 
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

    const GPU = await prisma.gpu.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit GPU</PageHeader>
        <GpuForm gpu={GPU} />
        </>
    )
}