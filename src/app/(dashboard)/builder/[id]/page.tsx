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
    <div className='flex flex-col w-full grow'>
      <div className='flex justify-between px-5 py-5'>
        <p>Form: Name</p>
        <Preview />
      </div>

      <DndContext id={"111"} sensors={sensors}>
        <div className='grow h-[200px] bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
          <ResizablePanelGroup direction="horizontal" className='h-full'>
            <ResizablePanel defaultSize={75}>
              <div className='overflow-y-auto h-full mx-5'>
                <Designer />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25} minSize={20}>
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
