'use client'
import React from 'react'
import { FormElementInstance, FormElements } from './FormElements'
import { Button } from '../ui/button'
import { MousePointerClickIcon } from 'lucide-react'

export default function FormSubmitComponent({
    formUrl,
    formContent
}: {
    formUrl: string,
    formContent: FormElementInstance[]
}) {
    function submitForm(){
        
    }
    return (
        <div className='flex justify-center w-full h-full items-center p-8'>
            <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded'>

                {
                    formContent.map(element => {
                        const FormElement = FormElements[element.type].previewComponent
                        return <FormElement key={element.id} elementInstance={element} />
                    })
                }
                <Button className='mt-8' onClick={()=>{
                    submitForm()
                }}>
                    <MousePointerClickIcon className='mr-2'/>
                    Submit</Button>
            </div>
        </div>
    )
}
