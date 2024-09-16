import { prisma } from "@/lib/prisma";                    
import { CpuForm } from "../../new/cpuForm"; 
import { PageHeader } from "@/app/admin/adminComponents/PageHeader";

export default async function EditProductPage({
    params: { id },
}: {
  params: { id: string }
}) {
    const CPU = await prisma.cPU.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit CPU</PageHeader>
        <CpuForm cpu={CPU} />
        </>
    )

}