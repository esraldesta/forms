import useDesigner from '@/hooks/useDesigner'
import { useDndMonitor, useDroppable } from '@dnd-kit/core'
import React, { useState } from 'react'
import { ElementsType, FormElementInstance, FormElements } from './forms/FormElements'
import { Trash } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

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
  const { removeElement } = useDesigner()
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true
    }
  })

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true
    }
  })



  const { setSelectedElement } = useDesigner()
  const DesignerComponent = FormElements[element.type].designerComponent
  return (
    <div onClick={() => {
      setSelectedElement(element)
    }}
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={(() => {
        setMouseIsOver(false)
      })}
      className='relative'
    >
      <div ref={topHalf.setNodeRef} className='absolute top-0 w-full h-1/2 rounded-t'></div>
      <div ref={bottomHalf.setNodeRef} className='absolute bottom-0 w-full h-1/2 rounded-b'></div>
      {
        mouseIsOver &&
        <>
          <div className='absolute h-full right-0 z-10'>
            <Button className="h-full bg-destructive rounded rounded-l-none" variant={"destructive"}
              onClick={() => {
                removeElement(element.id)
              }}
            >
              <Trash />
            </Button>
          </div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-100'>
            <p className='text-muted-foreground text-sm'>Click for properities or drag to move</p>
          </div>
        </>
      }


      <div className={
        cn("opacity-100",
          mouseIsOver && "opacity-30"
        )
      }>
        <DesignerComponent key={element.id} elementInstance={element} />
      </div>
    </div>)
}
