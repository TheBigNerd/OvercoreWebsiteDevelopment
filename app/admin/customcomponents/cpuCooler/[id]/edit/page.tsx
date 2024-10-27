import { prisma } from "@/lib/prisma";                    
import { CpuCoolerForm } from "../../new/cpuCoolerForm";
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

    const CpuCooler = await prisma.cpuCooler.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit CPU Cooler</PageHeader>
        <CpuCoolerForm cpuCooler={CpuCooler} />
        </>
    )
}