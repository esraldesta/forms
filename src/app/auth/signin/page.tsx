import Signin from '@/components/auth/Signin'
import Link from 'next/link'
import React from 'react'

export default async function page() {
  
  return (
    <section>
      <div className="flex flex-col items-center md:justify-center px-6 py-8 mx-auto h-screen">
        <Link href="/" className="flex items-center mb-5 text-2xl font-semibold">Forms</Link>
        <div className="w-full rounded-lg border md:mt-0 sm:max-w-md xl:p-0">
        <Signin/>
        </div>
      </div>
    </section>
  )
}
