import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/auth/signin");
  }
  return session.user;
}

export async function isOwner(userId: string, ownerId: string) {
  if(userId === "" || ownerId === ""){
    return redirect("/auth/signin");
  }

  if (userId !== ownerId) {
    return redirect("/auth/signin");
  }
  return true;
}
