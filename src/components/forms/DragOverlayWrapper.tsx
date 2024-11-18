import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { ElementsType, FormElements } from './FormElements'
import { SidebarBtnWrapper } from '../SidebarBtn'
import useDesigner from '@/hooks/useDesigner'

export default function DragOverlayWrapper() {
  const { elements } = useDesigner()
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
    node = <SidebarBtnWrapper element={FormElements[type]} />
  }
  const isDesignerElement = draggedElement.data.current?.isDesignerElement
  if (isDesignerElement) {
    const elementId = draggedElement.data?.current?.elementId
    const element = elements.find(element => element.id === elementId)
    if (!element) return node = <p>No element found</p>;
    else {
      const DesignerElementComponent = FormElements[element.type].designerComponent
      node = <DesignerElementComponent elementInstance={element} />
    
    }
  }
  return (
    <DragOverlay>{node}</DragOverlay>
  )
}
