"use client"
import Designer from '@/components/Designer'
import DesignerSideBar from '@/components/DesignerSideBar'
import DragOverlayWrapper from '@/components/forms/DragOverlayWrapper'
import Preview from '@/components/Preview'
import DesignerContextProvider from '@/contexts/DesignerContext'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import React from 'react'

export default function page() {

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    }
  })
  const touchSensor = useSensor(TouchSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  return (
    <DesignerContextProvider>
      <div className='grow bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] flex flex-col'>
        <div className='flex justify-between px-5 py-5 bg-accent'>
          <p>Form: Name</p>
          <Preview />
        </div>
        <DndContext id={"111"} sensors={sensors}>
          <div className='grow grid grid-cols-6 gap-2 ml-5'>
            <Designer />
            <DesignerSideBar />
          </div>

          <DragOverlayWrapper />
        </DndContext>
      </div>
    </DesignerContextProvider>
  )
}
