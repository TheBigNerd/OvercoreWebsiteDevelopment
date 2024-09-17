import { PageHeader } from "@/app/admin/adminComponents/PageHeader";
import { PSUForm } from "./psuForm";

export default function NewProductPage() {
    return(
        <>
        <PageHeader>Add New PSU</PageHeader>
        <PSUForm />
        </>
    )

}