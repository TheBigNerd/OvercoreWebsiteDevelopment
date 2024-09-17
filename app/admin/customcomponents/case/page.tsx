import Link from "next/link";
import { PageHeader } from "../../adminComponents/PageHeader";
import CaseTable from "@/app/admin/customcomponents/case/CaseTable"
import { Button } from "@/components/ui/button";

export default function CaseHome() {
    return (
        <>
        <div className="flex justify-between items-center gap-4">
        <PageHeader>CPU</PageHeader>
        <Link href="/admin/customcomponents/case/new" passHref>
            <Button>
                Add Case
            </Button>
        </Link>
    </div>
        <CaseTable/>
        </>
    )
}