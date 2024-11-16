'use client'

import React, { useEffect } from 'react'
import { ElementsType, FormElement, FormElementInstance } from '../FormElements'
import { SeparatorHorizontal } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import useDesigner from '@/hooks/useDesigner'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'

const type: ElementsType = "SpacerField"

const extraAttributes = {
    height: 20,
}

const propertiesSchema = z.object(
    {
        height: z.number().min(5).max(50),
    }
)
export const SpacerField: FormElement = {
    type,
    btnElement: {
        icon: <SeparatorHorizontal />,
        label: "Spacer Field"
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
    const { height } = elementInstance.extraAttributes
    return <div className='flex flex-col gap-2 w-full items-center'>
        <Label className='text-muted-foreground'>Spacer Field:{height} px</Label>
        <Separator className='h-8 w-8' />
    </div>

}

function PreviewComponent({ elementInstance }: {
    elementInstance: FormElementInstance,
}) {
    const { height } = elementInstance.extraAttributes
    return <div style={{
        height, width: "100%"
    }}></div>
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
                height: element.extraAttributes.title
            }
        }
    )

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        const { height } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                height
            }
        })
    }

    return (<Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} className='space-y-3' onSubmit={(e) => {
            e.preventDefault()
        }}>
            <FormField control={form.control} name="height" render={({ field }) => (
                <FormItem>
                    <FormLabel>Height {form.watch("height")} px</FormLabel>
                    <FormControl className='pt-2'>
                        <Slider defaultValue={[
                            field.value
                        ]}
                            min={5}
                            max={50}
                            step={1}
                            onValueChange={(value) => {
                                field.onChange(value[0])
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}>
            </FormField>
        </form>
    </Form>)
}