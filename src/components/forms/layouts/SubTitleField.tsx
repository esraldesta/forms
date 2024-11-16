'use client'

import React, { useEffect } from 'react'
import { ElementsType, FormElement, FormElementInstance } from '../FormElements'
import { Heading2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import useDesigner from '@/hooks/useDesigner'

const type: ElementsType = "SubTitleField"

const extraAttributes = {
    title: "SubTitle field",
}

const propertiesSchema = z.object(
    {
        title: z.string().min(2).max(50),
    }
)
export const SubTitleField: FormElement = {
    type,
    btnElement: {
        icon: <Heading2 />,
        label: "SubTitle Field"
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
    const { title } = elementInstance.extraAttributes
    return <div className='flex flex-col gap-2 w-full'>
        <Label className='text-muted-foreground'>SubTitle Field</Label>
        <p className='text-lg'>{title}</p>
    </div>

}

function PreviewComponent({ elementInstance }: {
    elementInstance: FormElementInstance,
}) {
    const { title } = elementInstance.extraAttributes
    return <p className='text-lg'>{title}</p>
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
                title: element.extraAttributes.title
            }
        }
    )

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        const { title } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                title
            }
        })
    }

    return (<Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} className='space-y-3' onSubmit={(e) => {
            e.preventDefault()
        }}>
            <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={(e) => {
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