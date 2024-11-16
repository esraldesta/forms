'use client'

import React, { useEffect, useState } from 'react'
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from '../FormElements'
import { Hash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import useDesigner from '@/hooks/useDesigner'
import { cn } from '@/lib/utils'

const type: ElementsType = "NumberField"

const extraAttributes = {
    label: "Number field",
    helperText: "Helper text",
    required: false,
    placeholder: "0",
}

const propertiesSchema = z.object(
    {
        label: z.string().min(2).max(50),
        helperText: z.string().max(200),
        required: z.boolean().default(false),
        placeholder: z.string().max(50)
    }
)
export const NumberField: FormElement = {
    type,
    btnElement: {
        icon: <Hash />,
        label: "Number Field"
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
    validate: (formElement: FormElementInstance, curentValue: string): boolean => {
        const element = formElement
        if (element.extraAttributes.required) {
            return curentValue.length > 0
        }

        return true
    }
}


function DesignerComponent({ elementInstance }: {
    elementInstance: FormElementInstance
}) {
    const { label, placeholder, helperText, required } = elementInstance.extraAttributes
    return <div className='flex flex-col gap-2 w-full'>
        <Label>{label}{required && "*"}</Label>
        <Input readOnly disabled type='number' placeholder={placeholder}></Input>
        {helperText && <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>}
    </div>

}

function PreviewComponent({ elementInstance, submitValue, isInValid, defaultValue }: {
    elementInstance: FormElementInstance,
    submitValue?: SubmitFunction,
    isInValid?: boolean,
    defaultValue?: string
}) {
    const [value, setValue] = useState(defaultValue || "")
    const [error, setError] = useState(false)
    const { label, placeholder, helperText, required } = elementInstance.extraAttributes

    useEffect(() => {
        setError(isInValid === true)
    }, [isInValid])

    return <div className='flex flex-col gap-2 w-full'>
        <Label className={cn(error && "text-red-500")}>{label}{required && "*"}</Label>
        <Input className={cn(error && "text-red-500")} type='number' placeholder={placeholder} onChange={e => setValue(e.target.value)}
            onBlur={
                (e) => {
                    if (!submitValue) return;
                    const valid = NumberField.validate(elementInstance, e.target.value)
                    setError(!valid);
                    if (!valid) return;
                    submitValue(elementInstance.id, e.target.value)
                }
            }
            value={value}
        ></Input>
        {helperText && <p className={cn(error && "text-red-500", "text-muted-foreground text-[0.8rem]")} >{helperText}</p>}
    </div>

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
                label: element.extraAttributes.label,
                helperText: element.extraAttributes.helperText,
                required: element.extraAttributes.required,
                placeholder: element.extraAttributes.placeholder
            }
        }
    )

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        const { helperText, label, placeholder, required } = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                helperText,
                label,
                placeholder,
                required
            }
        })
    }

    return (<Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} className='space-y-3' onSubmit={(e) => {
            e.preventDefault()
        }}>
            <FormField control={form.control} name="label" render={({ field }) => (
                <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.currentTarget.blur()
                            }
                        }} />
                    </FormControl>
                    <FormDescription>
                        The lable of the field. <br /> It will be displayed above the field
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}>
            </FormField>

            <FormField control={form.control} name="placeholder" render={({ field }) => (
                <FormItem>
                    <FormLabel>PlaceHolder</FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.currentTarget.blur()
                            }
                        }} />
                    </FormControl>
                    <FormDescription>
                        The palceholder of the field.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}>
            </FormField>

            <FormField control={form.control} name="helperText" render={({ field }) => (
                <FormItem>
                    <FormLabel>HelperText</FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.currentTarget.blur()
                            }
                        }} />
                    </FormControl>
                    <FormDescription>
                        The helperText of the field. <br /> It will be displayed below the field
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}>
            </FormField>

            <FormField control={form.control} name="required" render={({ field }) => (
                <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <div className='space-y-0.5'>
                        <FormLabel>Required</FormLabel>

                        <FormDescription>
                            The lable of the field. <br /> It will be displayed above the field
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}>
            </FormField>
        </form>
    </Form>)
}