"use server"

import { signOut } from "@/auth"

export const logout = async() => {
    // SERVER ACTIONS BEFORE LOGOUT
    await signOut({redirectTo: `/auth/login`})
}