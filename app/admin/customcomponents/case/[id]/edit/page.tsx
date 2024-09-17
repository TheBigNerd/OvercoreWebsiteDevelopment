import { prisma } from "@/lib/prisma";                    
import { CaseForm } from "../../new/caseForm";
import { PageHeader } from "@/app/admin/adminComponents/PageHeader";

export default async function EditProductPage({
    params: { id },
}: {
  params: { id: string }
}) {
    const Case = await prisma.case.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit CPU</PageHeader>
        <CaseForm Case={Case} />
        </>
    )

}