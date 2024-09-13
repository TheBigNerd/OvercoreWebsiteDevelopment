import Link from "next/link";
import { PageHeader } from "../../adminComponents/PageHeader";
import ComponentTable from "../components/componentTable";
import { Button } from "@/components/ui/button";

export default function cpuHome() {
    return (
        <>
        <div className="flex justify-between items-center gap-4">
        <PageHeader>CPU</PageHeader>
        <Link href="/admin/customcomponents/cpuCooler/new" passHref>
            <Button>
                Add CPU
            </Button>
        </Link>
    </div>
        <ComponentTable componenttype="cPU"/>
        </>
    )
}