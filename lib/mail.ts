import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string,
) => {
    await resend.emails.send({
        from: "authentication@overcore.co.uk",
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

    await resend.emails.send({ from: "authentication@overcore.co.uk", to: email, subject: "Confirm your email", html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`})
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "reset-password@overcore.co.uk",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`})
    }