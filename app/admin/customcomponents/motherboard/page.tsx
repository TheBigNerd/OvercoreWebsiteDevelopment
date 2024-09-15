import Link from "next/link";
import { PageHeader } from "../../adminComponents/PageHeader";
import { Button } from "@/components/ui/button";
import MotherboardTable from "./motherboardTable"; // Corrected import and component name

export default function MotherboardHome() { // Corrected function name
    return (
        <>
        <div className="flex justify-between items-center gap-4">
        <PageHeader>Motherboard</PageHeader>
        <Link href="/admin/customcomponents/motherboard/new" passHref>
            <Button>
                Add Motherboard
            </Button>
        </Link>
    </div>
        <MotherboardTable/>
        </>
    )
}