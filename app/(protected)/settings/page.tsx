"use client"

import {Card,CardContent,CardHeader} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { settings } from "../_components/auth/actions/settings"
import { useTransition, useState } from "react"
import { useSession } from "next-auth/react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SettingsSchema } from "@/schemas"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCurrentUser } from "@/hooks/use-current-user"
import { FormError } from "../_components/auth/form-error"
import { FormSuccess } from "../_components/auth/form-success"
import { Switch } from "@/components/ui/switch"
import { LogoutButton } from "../_components/auth/logout-button"
import { AdminNavBar } from "../_components/Adminnavbar"

const SettingsPage = () => {
    const user = useCurrentUser()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const { update } = useSession()
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }

    })
    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                }
                if (data.success) {
                    update()
                    setSuccess(data.success)
                }
        })
        .catch(() => setError("Something went wrong!"))
        })
    }
    return (
        <>
        <Card className="bg-slate-100 w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Account Settings
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    placeholder="Elvis Presley"
                                    disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        </div>
                        {user?.isOAuth === false && (
                        <>
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    placeholder="elvis.presley@email.com"
                                    type="email"
                                    disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                         <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    placeholder="**********"
                                    type="password"
                                    disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                         <FormField control={form.control} name="newPassword" render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    placeholder="**********"
                                    type="password"
                                    disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        </>
                        )}
                        {user?.isOAuth === false && (
                        <>
                         <FormField control={form.control} name="isTwoFactorEnabled" render={({ field }) => (
                            <FormItem className="flex flex-role itmes-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Two Factor Authentication</FormLabel>
                                    <FormDescription>
                                        Enable two factor authentication for your account
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange}  />
                                </FormControl>
                                
                            </FormItem>
                        )}/>  
                        </>
                        )}                     
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button type="submit" disabled={isPending}>
                            Save
                        </Button>
                    </form>
                </Form>
                <div className="py-2">
                <LogoutButton>
                    <Button>
                        Logout
                    </Button>
                </LogoutButton>
                </div>
            </CardContent>
        </Card>
        </>
    )
}
export default SettingsPage;