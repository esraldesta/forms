import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { ElementsType,FormElements } from './FormElements'
import { SidebarBtnWrapper } from '../SidebarBtn'

export default function DragOverlayWrapper() {
  const [draggedElement, setDraggedElement] = useState<Active | null>(null)
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedElement(event.active)
    },
    onDragCancel: () => {
      setDraggedElement(null)
    },
    onDragEnd: () => {
      setDraggedElement(null)
    }
  }
  )

  if (!draggedElement) return null;
  let node = <p>No overlay</p>
  const isSidebarBtnElement = draggedElement.data.current?.isSidebarBtnElement
  const type = draggedElement.data.current?.type as ElementsType
  if (isSidebarBtnElement) {
    node = <SidebarBtnWrapper element={FormElements[type]}/>
  }
  return (
    <DragOverlay>{node}</DragOverlay>
  )
}
