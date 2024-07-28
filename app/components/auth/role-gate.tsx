"use client"

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "./form-error";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole
}

export const RoleGate = ({ children, allowedRole}: RoleGateProps) => {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <FormError message="Permission Denied" />
        )

    }

    return (
        <>
        {children}
        </>
    )
}