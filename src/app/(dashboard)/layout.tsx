import { auth } from "@/auth";
import ModeToggle from "@/components/ModeToggle";
import Profile from "@/components/Profile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <div>
      <nav className="flex justify-between px-10 py-2 bg-accent">
        <Link href="/" className="inline-block  font-bold text-3xl bg-gradient-to-r from-blue-400 to-blue-600 text-transparent select-none bg-clip-text">Forms</Link>
        <div className="flex gap-x-2 items-center">
          {
            session?.user ?
              <Profile /> : <Link href="/auth/signin" className="bg-primary text-primary-foreground  py-1 px-2 rounded">Login</Link>
          }

          <ModeToggle />
        </div>
      </nav>
      {children}
    </div>
  )
}
