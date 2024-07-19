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

export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        login(values)
        console.log(values)
    }

    return(
        <CardWrapper headerLabel="Welcome Back" backButtonLabel="Dont have an account?" backButtonHref="/auth/register" showSocial>
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
                                    <Input {...field} placeholder="elvis.presley@email.com" type="email" />
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
                                    <Input {...field} placeholder="**********" type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}      
                        />
                    </div>
                    <FormError message="" />
                    <FormSuccess message="" />
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}