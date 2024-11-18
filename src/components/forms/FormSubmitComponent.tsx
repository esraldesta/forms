'use client'
import React, { useCallback, useRef, useState, useTransition } from 'react'
import { FormElementInstance, FormElements } from './FormElements'
import { Button } from '../ui/button'
import { Loader, MousePointerClickIcon } from 'lucide-react'
import { SubmitForm } from '@/lib/actions'
import { useToast } from '@/hooks/use-toast'

export default function FormSubmitComponent({
    formUrl,
    formContent
}: {
    formUrl: string,
    formContent: FormElementInstance[]
}) {
    const { toast } = useToast()
    const formValues = useRef<{ [key: string]: string }>({})
    const formErrors = useRef<{ [key: string]: boolean }>({})
    const [renderKey, setRenderKey] = useState(new Date().getTime())
    const [submitted, setSubmitted] = useState(false);
    const [pending, startTransition] = useTransition()
    const validateForm: () => boolean = useCallback(() => {
        for (const field of formContent) {
            const actualValue = formValues.current[field.id] || ""
            const valid = FormElements[field.type].validate(field, actualValue)
            if (!valid) {
                formErrors.current[field.id] = true

            }
        }
        if (Object.keys(formErrors.current).length > 0) {
            return false
        }
        return true;
    }, [formContent]);
    const submitValue = useCallback((key: string, value: string) => {
        formValues.current[key] = value;
    }, [])
    async function submitForm() {
        formErrors.current = {};
        const validForm = validateForm();
        if (!validForm) {
            setRenderKey(new Date().getTime())
            toast({
                title: "Error",
                description: "Please check the form errors",
                variant: "destructive"
            })
            return;
        }

        try {
            const jsonContent = JSON.stringify(formValues.current)
            await SubmitForm(formUrl, jsonContent)
            setSubmitted(true);
        } catch (error) {
            console.log(error);

            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }

    if (submitted) {
        return (
            <div className='flex justify-center w-full h-full items-center p-8'>
                <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded'>
                    <h1 className='text-2xl font-bold'>Form Submitted</h1>
                    <p className='text-muted-foreground'>Thank you for your time. you can close this page now!</p>
                </div>
            </div>
        )
    }
    return (
        <div className='flex justify-center w-full h-full items-center p-8'>
            <div key={renderKey} className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded'>

                {
                    formContent.map(element => {
                        const FormElement = FormElements[element.type].previewComponent
                        return <FormElement key={element.id} elementInstance={element} submitValue={submitValue} isInValid={formErrors.current[element.id]} defaultValue={formValues.current[element.id]} />
                    })
                }
                <Button className='mt-8' disabled={pending} onClick={() => {
                    startTransition(submitForm)
                }}>
                    {!pending && <>
                        <MousePointerClickIcon className='mr-2' />
                        Submit
                    </>
                    }
                    {
                        pending && <Loader className='animate-spin' />
                    }
                </Button>


            </div>
        </div>
    )
}
