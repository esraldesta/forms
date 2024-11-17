"use client"
import Designer from '@/components/Designer'
import DesignerSideBar from '@/components/DesignerSideBar'
import DragOverlayWrapper from '@/components/forms/DragOverlayWrapper'
import Preview from '@/components/Preview'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import React from 'react'

export default function Page() {

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        }
    })
    const touchSensor = useSensor(TouchSensor)
    const sensors = useSensors(mouseSensor, touchSensor)
    return (
        <div className='flex flex-col w-full grow h-screen'>
            <div className='flex justify-between px-2  md:px-5 py-5'>
                <p className='truncate'>Form: <span className='text-xs'>Form Name</span></p>
                <div className='flex justify-end gap-x-1'>
                    <Preview />
                </div>
            </div>

            <DndContext id={"111"} sensors={sensors}>
                <div className='grow h-[200px] bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
                    <ResizablePanelGroup direction="horizontal" className='h-full'>
                        <ResizablePanel defaultSize={73}>
                            <div className='overflow-y-auto h-full mx-5'>
                                <Designer />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={27} minSize={20}>
                            <div className='overflow-y-auto h-full'>
                                <DesignerSideBar />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>

                <DragOverlayWrapper />
            </DndContext>
        </div>
    )
}
