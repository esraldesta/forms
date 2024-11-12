'use client'

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { signInSchema } from "@/lib/schemas";
import { singin } from "@/lib/actions";
import { useState } from "react";
import LoadingBtn from "../LoadingBtn";

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
            }else{
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
                <form className="p-5 space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email" render={({ field }) => (
                            <FormItem className="space-y-0">
                                <FormLabel className="text-foreground">Email</FormLabel>
                                <FormMessage />
                                <FormControl><Input type='email' placeholder="Enter your email address" autoComplete="off" {...field} /></FormControl>
                            </FormItem>
                        )}></FormField>

                    <FormField
                        control={form.control}

                        name="password" render={({ field }) => (
                            <FormItem className="space-y-0">
                                <FormLabel className="text-foreground">Password</FormLabel>
                                <FormMessage />
                                <FormControl><Input type='password' placeholder="Enter your password" autoComplete="off" {...field} /></FormControl>
                            </FormItem>
                        )}></FormField>

                    <LoadingBtn pending={form.formState.isSubmitting} />
                </form>
            </Form>
        </div >
    );
};

export default Signin;
