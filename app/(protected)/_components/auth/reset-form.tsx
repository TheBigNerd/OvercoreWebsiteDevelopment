"use client"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { ResetSchema } from "@/schemas"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { reset } from "./actions/reset"
import { useState, useTransition } from "react"
import Link from "next/link"
import { House } from "lucide-react"

export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            reset(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success)
            })
        })
    }

    return(
        <div className="relative">
        <Link href="/" className="absolute top-4 left-3 text-xs">
        <House />
        </Link>
        <CardWrapper headerLabel="Forgot your password?" backButtonLabel="Back to Login" backButtonHref="/auth/login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" disabled={isPending} className="w-full">
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
        </div>
    )
}