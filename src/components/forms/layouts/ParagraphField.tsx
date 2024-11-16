'use client'

import React, { useEffect } from 'react'
import { ElementsType, FormElement, FormElementInstance } from '../FormElements'
import { Text } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import useDesigner from '@/hooks/useDesigner'
import { Textarea } from '@/components/ui/textarea'

const type: ElementsType = "ParagraphField"

const extraAttributes = {
    text: "Text Here",
}

const propertiesSchema = z.object(
    {
        text: z.string().min(2).max(500),
    }
)
export const ParagraphField: FormElement = {
    type,
    btnElement: {
        icon: <Text />,
        label: "Paragraph Field"
    },

    constract: (id: string) => {
        return (
            {
                id,
                type,
                extraAttributes
            }
        )

    },
    designerComponent: DesignerComponent,
    previewComponent: PreviewComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true
}


function DesignerComponent({ elementInstance }: {
    elementInstance: FormElementInstance
}) {
    const { text } = elementInstance.extraAttributes
    return <div className='flex flex-col gap-2 w-full'>
        <Label className='text-muted-foreground'>Paragraph Field</Label>
        <p>{text}</p>
    </div>

}

function PreviewComponent({ elementInstance }: {
    elementInstance: FormElementInstance,
}) {
    const { text } = elementInstance.extraAttributes
    return <p>{text}</p>
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance;
    const { updateElement } = useDesigner()
    const form = useForm<propertiesFormSchemaType>(
        {
            resolver: zodResolver(propertiesSchema),
            mode: 'onBlur',
            defaultValues: {
                text: element.extraAttributes.text
            }
        }
    )

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        const { text } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                text
            }
        })
    }

    return (<Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} className='space-y-3' onSubmit={(e) => {
            e.preventDefault()
        }}>
            <FormField control={form.control} name="text" render={({ field }) => (
                <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                        <Textarea rows={5} {...field} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.currentTarget.blur()
                            }
                        }} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}>
            </FormField>
        </form>
    </Form>)
}