import { PageHeader } from "@/app/admin/adminComponents/PageHeader";
import { MemoryForm } from "./memoryForm";

export default function NewProductPage() {
    return(
        <>
        <PageHeader>Add New Memory</PageHeader>
        <MemoryForm />
        </>
    )

}