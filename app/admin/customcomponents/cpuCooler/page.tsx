import Link from "next/link";
import { PageHeader } from "../../adminComponents/PageHeader";
import ComponentTable from "../components/componentTable";
import { Button } from "@/components/ui/button";

export default function cpuCooler() {
    return (
        <>
                <div className="flex justify-between items-center gap-4">
            <PageHeader>CPU Coolers</PageHeader>
            <Link href="/admin/customcomponents/cpuCooler/new" passHref>
                <Button>
                    Add CPU Cooler
                </Button>
            </Link>
        </div>
        <ComponentTable componenttype="cpuCooler"/>
        </>
    )
}