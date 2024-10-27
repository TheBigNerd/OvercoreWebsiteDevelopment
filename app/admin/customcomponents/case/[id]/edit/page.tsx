import { prisma } from "@/lib/prisma";                    
import { CaseForm } from "../../new/caseForm";
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

    const Case = await prisma.case.findUnique( { where: { id }})
    return(
        <>
        <PageHeader>Edit CPU</PageHeader>
        <CaseForm Case={Case} />
        </>
    )
}