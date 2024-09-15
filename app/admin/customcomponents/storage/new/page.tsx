import { PageHeader } from "@/app/admin/adminComponents/PageHeader";
import { StorageForm } from "./storageForm";

export default function NewProductPage() {
    return(
        <>
        <PageHeader>Add New Storage</PageHeader>
        <StorageForm />
        </>
    )
}