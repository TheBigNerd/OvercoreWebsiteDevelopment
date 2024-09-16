import Link from "next/link";
import { PageHeader } from "../../adminComponents/PageHeader";
import GPUTable from "./gpuTable";
import { Button } from "@/components/ui/button";

export default function GPUHome() {
    return (
        <>
        <div className="flex justify-between items-center gap-4">
        <PageHeader>GPU</PageHeader>
        <Link href="/admin/customcomponents/gpu/new" passHref>
            <Button>
                Add GPU
            </Button>
        </Link>
    </div>
        <GPUTable/>
        </>
    )
}