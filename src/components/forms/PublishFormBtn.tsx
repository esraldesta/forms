import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { FileBadge2 } from 'lucide-react'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '../ui/alert-dialog'
import { Publishform } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function PublishFormBtn({ id }: {
    id: number
}) {
    const { toast } = useToast()
    const router = useRouter()
    const [loading, startTransition] = useTransition()
    async function publishForm() {
        try {
            await Publishform(id);
            toast(
                {
                    title:"Success",
                    description:"Your form is now available to the public ",
                    variant:'destructive'
                }    
               )
            router.refresh()
        } catch (error) {
            toast(
                {
                    title:"Error",
                    description:"Something went wrong",
                    variant:'destructive'
                }    
               )
            console.log(error);

        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='gap-2 text-white bg-gradient-to-r from-indigo-300 to-cyan-400' size={'sm'}>
                    <FileBadge2 className='h-4 w-4' />
                    Publish
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are You absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can&apos;t be undone. After publishing you will not be able to to edit this form.
                        <br />
                        <br />
                        <span className="font-medium">By Publishing this form you will make it available to the public and you will be able to to collect submissions </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={loading} onClick={(e) => {
                        e.preventDefault()
                        startTransition(publishForm)
                    }}>{loading ? "publishing" : "Proceed"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


