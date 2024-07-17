
import NextAuth from "next-auth"
import google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import resend from "next-auth/providers/resend"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [google, resend],
  adapter: PrismaAdapter(prisma)
})
