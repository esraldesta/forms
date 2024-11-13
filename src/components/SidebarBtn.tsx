import React from 'react'
import { FormElement } from './forms/FormElements'
import { useDraggable } from "@dnd-kit/core"
export default function SidebarBtn({ element }: {
    element: FormElement
}) {
    const draggable = useDraggable({
        id: `sidebarbtn ${element.type}`,
        data: {
            type: element.type,
            isSidebarBtnElement: true
        }
    })
    const { label, icon } = element.btnElement;
    return (
        <div ref={draggable.setNodeRef}
            {
            ...draggable.listeners
            }
            {
            ...draggable.attributes
            }
            className='w-[100px] h-[100px] flex flex-col justify-center items-center bg-background rounded overflow-hidden text-center'>
            {icon}
            <p>{label}</p>
        </div>
    )
}


export function SidebarBtnWrapper({ element }: {
    element: FormElement
}) {
    const { label, icon } = element.btnElement;
    return (
        <div
            className='w-[100px] h-[100px] flex flex-col justify-center items-center bg-background rounded overflow-hidden text-center'>
            {icon}
            <p>{label}</p>
        </div>
    )
}