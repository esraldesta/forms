import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import useDesigner from '@/hooks/useDesigner'
import { UpdateFormContent } from '@/lib/actions'
import { toast } from '@/hooks/use-toast'
import { Loader, Save } from 'lucide-react'

export default function SaveBtn({ id }: {
    id: number
}) {
    const { elements } = useDesigner()
    const [loading, startStransition] = useTransition()
    const updateFormContent = async () => {
        try {
            const JsonElements = JSON.stringify(elements)
            await UpdateFormContent(id, JsonElements)
            toast({
                title: "Success",
                description: "Form has been saved"
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            })
            console.log(error);
        }
    }
    return (
        <Button variant={'outline'} size={'sm'} className='bg-primary/40 text-white' disabled={loading} onClick={() => {
            startStransition(updateFormContent)
        }}>
            <Save/>
            <span className='hidden md:block'>Save</span>
            {loading && <Loader className='animate-spin ' />}
        </Button>
    )
}
