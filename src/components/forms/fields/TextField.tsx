'use client'

import React, { useEffect } from 'react'
import { ElementsType, FormElement, FormElementInstance } from '../FormElements'
import { TextCursorInput } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import useDesigner from '@/hooks/useDesigner'

const type: ElementsType = "TextField"

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value Here",
}

const propertiesSchema = z.object(
  {
      label: z.string().min(2).max(50),
      helperText: z.string().max(200),
      required: z.boolean().default(false),
      placeholder: z.string().max(50)
  }
)
export const TextField: FormElement = {
  type,
  btnElement: {
    icon: <TextCursorInput />,
    label: "Text Field"
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
  previewComponent: previewComponent,
  propertiesComponent: PropertiesComponent
}


function DesignerComponent({ elementInstance }: {
  elementInstance: FormElementInstance
}) {
  const { label, placeholder, helperText, required } = elementInstance.extraAttributes
  return <div className='text-left m-2 p-2 border border-blue-200 rounded'>
    <Label htmlFor={elementInstance.id}>{label}</Label>
    <Input type="text" id={elementInstance.id} placeholder={placeholder} required={required} className='border-blue-200' />
    <p className='text-xs text-muted-foreground ml-2'>{helperText}</p>
  </div>

}

function previewComponent({ elementInstance }: {
  elementInstance: FormElementInstance
}) {
  const { label, placeholder, helperText, required } = elementInstance.extraAttributes
  console.log(label,placeholder,helperText,required);
  
  return <div className='text-left m-2 p-2 border border-blue-200 rounded'>
    <Label htmlFor={elementInstance.id}>{label}</Label>
    <Input type="text" id={elementInstance.id} placeholder={placeholder} required={required} className='border-blue-200' />
    <p className='text-xs text-muted-foreground ml-2'>{helperText}</p>
  </div>

}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>
function PropertiesComponent({ elementInstance }: {
    elementInstance: FormElementInstance
}) {
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
    
    return <Form {...form}>
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
                        <Switch checked={field.value} onCheckedChange={field.onChange}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}>
            </FormField>
        </form>
    </Form>
}