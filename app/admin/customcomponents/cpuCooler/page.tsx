import Link from "next/link";
import { PageHeader } from "../../adminComponents/PageHeader";
import { Button } from "@/components/ui/button";
import CPUCoolerTable from "./cpuCoolerTable";

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
        <CPUCoolerTable/>
        </>
    )
}