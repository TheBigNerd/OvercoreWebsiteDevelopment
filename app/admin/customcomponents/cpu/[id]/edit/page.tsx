import { prisma } from "@/lib/prisma";                    
import { CpuForm } from "../../new/cpuForm"; 
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

    const CPU = await prisma.cPU.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit CPU</PageHeader>
        <CpuForm cpu={CPU} />
        </>
    )
}