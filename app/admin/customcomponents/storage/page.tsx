import Link from "next/link";
import { PageHeader } from "../../adminComponents/PageHeader";
import StorageTable from "./storageTable";
import { Button } from "@/components/ui/button";

export default function cpuHome() {
    return (
        <>
        <div className="flex justify-between items-center gap-4">
        <PageHeader>Storage</PageHeader>
        <Link href="/admin/customcomponents/storage/new" passHref>
            <Button>
                Add Storage
            </Button>
        </Link>
    </div>
        <StorageTable/>
        </>
    )
}