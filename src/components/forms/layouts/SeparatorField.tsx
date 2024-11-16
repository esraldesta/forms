'use client'

import React from 'react'
import { ElementsType, FormElement } from '../FormElements'
import { SeparatorVertical } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'



const type: ElementsType = "SeparatorField"

export const SeparatorField: FormElement = {
    type,
    btnElement: {
        icon: <SeparatorVertical />,
        label: "Separator Field"
    },

    constract: (id: string) => {
        return (
            {
                id,
                type,
                extraAttributes: {}
            }
        )

    },
    designerComponent: DesignerComponent,
    previewComponent: PreviewComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true
}


function DesignerComponent() {
    return <div className='flex flex-col gap-2 w-full'>
        <Label className='text-muted-foreground'>Separator Field</Label>
        <Separator/>
    </div>
}

function PreviewComponent() {
    return <Separator/>
}


function PropertiesComponent() {
    return <p>No Properties</p>
}