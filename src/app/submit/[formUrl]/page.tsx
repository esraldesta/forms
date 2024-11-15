import { FormElementInstance } from '@/components/forms/FormElements';
import FormSubmitComponent from '@/components/forms/FormSubmitComponent';
import { GetFormContentByUrl } from '@/lib/actions';
import React from 'react'

export default async function Page({ params }: {
    params: {
        formUrl: string
    }
}) {
    const { formUrl } = await params
    const form = await GetFormContentByUrl(formUrl);
    if (!form) {
        throw new Error("Form not found")
    }
    const formContent = JSON.parse(form.content) as FormElementInstance[]
    return (
        <FormSubmitComponent formUrl={formUrl} formContent={formContent}/>
    )
}
