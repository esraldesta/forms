import useDesigner from '@/hooks/useDesigner'
import { useDndMonitor, useDroppable } from '@dnd-kit/core'
import React from 'react'
import { ElementsType, FormElementInstance, FormElements } from './forms/FormElements'

export default function Designer() {

  const idGenerator = () => {
    return Math.floor(Math.random() * 10001).toString()
  }


  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    }
  })

  const { elements, addElement } = useDesigner()

  useDndMonitor({
    onDragOver: () => {
      console.log("over");

    },
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;
      const type = active.data.current?.type as ElementsType
      const elementInstance = FormElements[type].constract(idGenerator())
      addElement(0, elementInstance)
    }


  })

  return (
    <div ref={droppable.setNodeRef}
      className='col-span-4 md:col-span-5 pb-10 flex justify-center'>
      <div className='text-center mt-5 bg-accent w-full max-w-[800px]  overflow-y-auto'>
        {elements.length < 1 ? <p>Drop Here</p>
          :
          <>
            {elements.map(element => {
              return <DesignerComponentWrapper key={element.id} element={element} />
            })}
          </>
        }

      </div>
    </div>
  )
}

function DesignerComponentWrapper({ element }: {
  element: FormElementInstance
}) {
  const { setSelectedElement } = useDesigner()
  const DesignerComponent = FormElements[element.type].designerComponent
  return (
    <div onClick={() => {
      setSelectedElement(element)
    }}>
      <DesignerComponent key={element.id} elementInstance={element} />
    </div>)
}
