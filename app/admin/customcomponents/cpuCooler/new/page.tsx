import { PageHeader } from "@/app/admin/adminComponents/PageHeader";
import { CpuCoolerForm } from "./cpuCoolerForm";

export default function NewProductPage() {
    return(
        <>
        <PageHeader>Add New CPU Cooler</PageHeader>
        <CpuCoolerForm />
        </>
    )

}