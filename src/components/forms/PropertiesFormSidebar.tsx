import React from 'react'
import { FormElements } from './FormElements'
import { X } from 'lucide-react';
import useDesigner from '@/hooks/useDesigner';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';

export default function PropertiesFormSidebar() {
    const { selectedElement, setSelectedElement } = useDesigner()
    if (!selectedElement) return null;
    const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent
    return (
        <div className='flex flex-col p-2'>
            <div className='flex justify-between items-center'>
                <p className='text-sm text-foreground/70'>Element Proporties</p>
                <Button size={"icon"} variant={"ghost"} onClick={() => {
                    setSelectedElement(null)
                }}>
                    <X />
                </Button>
            </div>
            <Separator className='mb-4'/>
            <PropertiesForm elementInstance={selectedElement} />

        </div>
    )
}
