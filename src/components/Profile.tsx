import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signout } from "@/lib/actions"
import { LogOutIcon, UserRound } from "lucide-react"

export default async function Profile() {
    const session = await auth()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full"><UserRound /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-36">
                <DropdownMenuLabel>
                    <p className="">My Account</p>
                    <p className="text-[8px] truncate">{session?.user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <form action={signout} className="w-full">
                        <button className="w-full flex items-center gap-2" type="submit"> <LogOutIcon size={12} /> Logout</button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
