"use client"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { LoginSchema } from "@/schemas"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { login } from "./actions/login"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export const LoginForm = () => {
    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            login(values)
            .then((data) => {
                if (data?.error) {
                    form.reset()
                    setError(data.error)
                }
                if (data?.success) {
                    form.reset()
                    setSuccess(data.success)
                }
                if (data?.twoFactor) {
                    setShowTwoFactor(true)
                }
            })
            .catch(() => setError("Somethign went wrong"))
        })
    }

    return(
        <CardWrapper headerLabel="Welcome Back" backButtonLabel="Dont have an account? Signup" backButtonHref="/auth/register" showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                    {showTwoFactor && (
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder="123456"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                    )}      
                    />
                    )}
                    {!showTwoFactor && (
                    <>
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="elvis.presley@email.com" type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}      
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="**********" type="password" />
                                </FormControl>
                                <Button size="sm" variant="link" asChild className="px-0 font-normal">
                                    <Link href="/auth/reset">
                                    Forgot Password?
                                    </Link>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )}      
                        />
                    </>
                    )}
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button type="submit" disabled={isPending} className="w-full">
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}