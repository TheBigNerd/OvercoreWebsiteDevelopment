import { PageHeader } from "@/app/admin/adminComponents/PageHeader";
import { CpuForm } from "./cpuForm";

export default function NewProductPage() {
    return(
        <>
        <PageHeader>Add New CPU</PageHeader>
        <CpuForm />
        </>
    )

}