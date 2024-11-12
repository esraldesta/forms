"use client"
import { singup } from '@/lib/actions'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect } from 'react'

export default function Signup() {
    const router = useRouter()
    const [data, action, isPending] = useActionState(singup, {
        error: false,
        errors: {},
        message: null,
    })

    useEffect(() => {
        console.log(data);
        
        if (!data.error && data.message) {
            router.push("/"); 
        }
    }, [data, router]);
    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center leading-tight tracking-tight md:text-2xl">
                Create an account
            </h1>
            {
                data.error && <p className='text-center text-destructive'>{data.message}</p>
            }
            <form className="space-y-4 md:space-y-5" action={action}>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-mediu">Your email</label>
                    {data?.errors.email && <p className='text-sm text-destructive'>{data?.errors.email[0]}</p>}
                    <input type="email" name="email" id="email" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                    {data?.errors?.password && <p className='text-sm text-destructive'>{data?.errors.password[0]}</p>}
                    <input type="password" name="password" id="password" placeholder="••••••••" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">Confirm password</label>
                    {data?.errors?.confirmPassword && <p className='text-sm text-destructive'>{data?.errors.confirmPassword[0]}</p>}
                    <input type="confirm-password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                </div>

                <button type="submit" className="w-ful bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-secondary disabled:bg-muted disabled:text-muted-foreground"
                    disabled={
                        isPending
                    }
                >Create an account</button>
                <p className="text-sm font-light">
                    Already have an account? <Link href="/auth/signin" className="font-medium underline">Login here</Link>
                </p>
            </form>
        </div>
    )
}
