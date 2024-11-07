"use client"

import Navbar from "@/app/(user)/_components/Navbar";
import Footer from "@/app/(user)/_components/Footer";
import Image from "next/image";
import SuccessColumn from "@/app/(user)/_components/PurchaseSuccess/successColumn";
import { GetServerSideProps } from "next";

export default function SuccessPage() {
    return (
        <div>
            <Navbar />
            <SuccessColumn/>
            <Footer />
        </div>
    );
}
