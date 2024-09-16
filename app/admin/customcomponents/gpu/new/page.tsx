import { PageHeader } from "@/app/admin/adminComponents/PageHeader";
import { GpuForm } from "./gpuForm";

export default function NewProductPage() {
    return(
        <>
        <PageHeader>Add New GPU</PageHeader>
        <GpuForm />
        </>
    )

}