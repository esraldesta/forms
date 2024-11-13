import React from 'react'
import { ElementsType, FormElement, FormElementInstance } from '../FormElements'
import { TextCursorInput } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const type: ElementsType = "TextField"

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value Here",
}

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
  designerComponent: designerComponent,
  previewComponent: previewComponent,
  propertiesComponent: propertiesComponent
}


function designerComponent({ elementInstance }: {
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
  
  return <div></div>

}

function propertiesComponent({ elementInstance }: {
  elementInstance: FormElementInstance
}) {
  const { label, placeholder, helperText, required } = elementInstance.extraAttributes
  console.log(label,placeholder,helperText,required);
  return <div></div>

}