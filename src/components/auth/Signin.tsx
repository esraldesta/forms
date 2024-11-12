'use client'

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { signInSchema } from "@/lib/schemas";
import { singin } from "@/lib/actions";
import { useState } from "react";
import LoadingBtn from "../LoadingBtn";
import Link from "next/link";


type signInType = z.infer<typeof signInSchema>

const Signin = () => {
    const [globalError, setGlobalError] = useState<string>("")
    const form = useForm<signInType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
            const error = await singin(values)
            if (error?.message) {
                setGlobalError(error.message)
            } else {
                setGlobalError("")
            }
        } catch (error) {
            console.log("error", error);

        }
    }
    return (
        <div>
            {globalError && <p className="text-destructive text-center p-2">{globalError}</p>}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 space-y-4 md:space-y-5">
                    <h1 className="text-xl text-center leading-tight tracking-tight md:text-2xl">
                        Signin to your account
                    </h1>
                    <FormField
                        control={form.control}
                        name="email" render={({ field }) => (
                            <FormItem className="space-y-0">
                                <FormLabel className="text-foreground">Email</FormLabel>
                                <FormMessage />
                                <FormControl><input type='email' placeholder="Enter your email address" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " {...field} /></FormControl>
                            </FormItem>
                        )}></FormField>

                    <FormField
                        control={form.control}

                        name="password" render={({ field }) => (
                            <FormItem className="space-y-0">
                                <FormLabel className="text-foreground">Password</FormLabel>
                                <FormMessage />
                                <FormControl><input type='password' placeholder="Enter your password" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " autoComplete="off" {...field} /></FormControl>
                            </FormItem>
                        )}></FormField>

                    <LoadingBtn pending={form.formState.isSubmitting} />


                    <p className="text-sm font-light">
                        Create new account? <Link href="/auth/signup" className="font-medium underline">Register here</Link>
                    </p>
                </form>
            </Form>
        </div >
    );
};

export default Signin;
