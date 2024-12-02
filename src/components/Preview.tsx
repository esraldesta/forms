import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import useDesigner from '@/hooks/useDesigner'
import { FormElements } from './forms/FormElements'
import { Presentation } from 'lucide-react'

export default function Preview() {
    const { elements } = useDesigner()
    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant={'outline'} size={'sm'} className='flex justify-center items-center'>
                    <Presentation/>
                    <span className='hidden md:block'>Preview</span>
                </Button>
            </DialogTrigger>
            <DialogContent className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0'>
                <DialogTitle>

                    <div className='px-4 py-2 border-b'>
                        <p className='text-muted-foreground text-lg font-bold'>Form preview</p>
                        <p className='text-sm text-muted-foreground'>This is how your form will look like to your users</p>
                    </div>
                </DialogTitle>
                <div className='bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto'>
                    <div className='max-w-[620] flex flex-col gap-2 flex-grow bg-background h-full w-ful rounded-2xl p-8 overflow-y-auto'>
                        {
                            elements.map((element) => {
                                const FormComponent = FormElements[element.type].previewComponent

                                return (

                                        <FormComponent key={element.id} elementInstance={element} isInValid={false}/>
                                    )
                            })
                        }
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
