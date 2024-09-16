import Link from "next/link";
import { PageHeader } from "../../adminComponents/PageHeader";
import MemoryTable from "./MemoryTable"
import { Button } from "@/components/ui/button";

export default function MemoryHome() {
    return (
        <>
        <div className="flex justify-between items-center gap-4">
        <PageHeader>Memory</PageHeader>
        <Link href="/admin/customcomponents/memory/new" passHref>
            <Button>
                Add Memory
            </Button>
        </Link>
    </div>
        <MemoryTable/>
        </>
    )
}