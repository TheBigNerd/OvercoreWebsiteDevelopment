"use client"
import { UserButton } from "@/app/components/auth/user-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavBar = () => {
    const pathname = usePathname()
    return (
        <nav className="bg-slate-200 flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2 ">
                <Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
                    <Link href="/settings">
                        Settings
                    </Link>
                </Button>
                <Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
                    <Link href="/settings">
                        Orders
                    </Link>
                </Button>
            </div>
            <p><UserButton /></p>
        </nav>
    )
}