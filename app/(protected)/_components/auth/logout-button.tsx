"use client"

import { logout } from "./actions/logout";
import router from "next/router";

interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
    const onClick = async () => {
        await logout();
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}