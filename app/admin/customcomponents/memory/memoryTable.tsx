import { prisma} from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatters";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Delete, MoreVertical } from "lucide-react";
import Link from "next/link";
import { DeleteMemoryItem } from "./MemoryAction";

export default async function memoryTable() {
    const component = await prisma.memory.findMany({ select : { id: true, title: true, imagePath: true, priceInPence: true}});
    if (component.length === 0) {
        return <p>No Components Found</p>
    }

    return (
        <>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {component.map((component: any) =>(
                    <TableRow key={component.id}>
                        <TableCell>{component.title}</TableCell>
                        <TableCell>{formatCurrency(component.priceInPence/100)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/customcomponents/memory/${component.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                <DeleteMemoryItem id={component.id} disabled={false} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    )
}