import { Button } from "@/components/ui/button";
import { PageHeader } from "../adminComponents/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./productComponents/ProductActions";

export default function AdminProductPage(){
    return(
        <>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>Products</PageHeader>
            <Link href="/admin/products/new" passHref>
                <Button>
                    Add Product
                </Button>
            </Link>
        </div>
        <ProductsTable/>
        </>
    )
}

async function ProductsTable() {
    const products = await prisma.product.findMany({ select: { id: true, name: true, priceInPence: true, isAvailable: true, _count: { select: {order: true}}}, orderBy: { name: "asc"}})
    if (products.length === 0) {
        return <p>No Products Found</p>
    }
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Availble For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell>
                            {product.isAvailable ? (
                                <>
                                <span className="sr-only">Available</span>
                                <CheckCircle2 />
                                </>
                            ) : (
                                <>
                                <span className="sr-only">Unavailable</span>
                                <XCircle className="stroke-destructive" />
                                </>
                            )
                            }
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.priceInPence / 100)}</TableCell>
                        <TableCell>{formatNumber(product._count.order)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem id={product.id} isAvailble={product.isAvailable} />
                                    <DeleteDropdownItem id={product.id} disabled={product._count.order > 0} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}