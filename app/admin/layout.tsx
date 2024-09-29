import { Nav, NavLink } from "./adminComponents/Nav"

export const dynamic = "force-dynamic"

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>
    <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customer</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
        <NavLink href="/admin/customcomponents">Component Editor</NavLink>
        <NavLink href="/admin/contactForms">Customer Enquiries</NavLink>
    </Nav>
    <div className="container my-6">{children}</div>
    </>
}
