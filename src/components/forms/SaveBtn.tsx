import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import useDesigner from '@/hooks/useDesigner'
import { UpdateFormContent } from '@/lib/actions'

import { Loader, Save } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function SaveBtn({ id }: {
    id: number
}) {
    const { toast } = useToast()
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
