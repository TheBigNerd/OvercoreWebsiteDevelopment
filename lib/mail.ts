import { Resend } from "resend"
import { Product } from "@prisma/client";
import ProductReceipt from "@/app/(user)/_components/receiptComponent";
import React from "react";
import ReactDOMServer from "react-dom/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string,
) => {
    await resend.emails.send({
        from: "Overcore-Authentication@overcore.co.uk",
        to: email,
        subject: "Two Factor Authentication Code",
        html: `<p>Your Two Factor Authentication Code: ${token} </p>`
    })

}

export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({ from: "Overcore-Authentication@overcore.co.uk", to: email, subject: "Confirm your email", html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`})
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "Overcore-Reset-Password@overcore.co.uk",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`})
    }

export const orderConfirmationEmail = async (
    email: string,
    products: any
) => {
    const ordersPage = `${domain}/orders`;

    await resend.emails.send({
        from: "OvercoreOrderConfirmation@overcore.co.uk",
        to: email,
        subject: "Order Confirmation",
        html: `<p>Your order has been confirmed.
        You can view your order <a href="${ordersPage}">here</a>.
        If you have any issues with your order don't hesitate to contact support at farhan@overcore.co.uk</p>
        `
    })
}