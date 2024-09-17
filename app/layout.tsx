import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"],
  variable: "--font-sans",
 });

export const metadata = {
  title: "Overcore",
  description: "Overcore is a PC builder offering pre-built and custom PC configurations.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={cn("min-h-screen font-sans antialiased", inter.variable)}>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}