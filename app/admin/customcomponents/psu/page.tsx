import Link from "next/link";
import { PageHeader } from "../../adminComponents/PageHeader";
import PSUTable from "./psuTable";
import { Button } from "@/components/ui/button";

export default function PSUHome() {
    return (
        <>
        <div className="flex justify-between items-center gap-4">
        <PageHeader>PSU</PageHeader>
        <Link href="/admin/customcomponents/psu/new" passHref>
            <Button>
                Add PSU
            </Button>
        </Link>
    </div>
        <PSUTable/>
        </>
    )
}