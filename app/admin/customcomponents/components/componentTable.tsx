import { prisma} from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatters";

type ComponentType = 'cPU' | 'cpuCooler' | 'motherboard' | 'memory' | 'storage' | 'gpu' | 'case' | 'pSU'; 

export default async function ComponentTable({componenttype}: {componenttype: ComponentType}) {
    const component = await (prisma[componenttype] as any).findMany({ select : { id: true, title: true, imagePath: true, priceInPence: true}});
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
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    )
}