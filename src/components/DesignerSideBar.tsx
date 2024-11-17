import React from 'react'
import { FormElements } from './forms/FormElements'
import SidebarBtn from './SidebarBtn'
import useDesigner from '@/hooks/useDesigner'
import PropertiesFormSidebar from './forms/PropertiesFormSidebar'

export default function DesignerSideBar() {
  const { selectedElement } = useDesigner()
  return (
    <div className='min-h-full bg-background p-1 bt border-t-[1px] border-border'>
      {
        selectedElement ?
          <PropertiesFormSidebar />
          :
          <div className='grid grid-cols-1'>
            <div className='p-2'>
              <p className='select-none mb-2 border-b text-muted-foreground'>Layout elements </p>
              <div className='flex flex-wrap gap-2'>
                <SidebarBtn element={FormElements.TitleField} />
                <SidebarBtn element={FormElements.SubTitleField} />
                <SidebarBtn element={FormElements.SeparatorField} />
                <SidebarBtn element={FormElements.SpacerField} />
              </div>
            </div>

            <div className='p-2'>
              <p className='select-none mb-2 border-b text-muted-foreground'>Field elements</p>
              <div className='flex flex-wrap gap-2'>
                <SidebarBtn element={FormElements.TextField} />
                <SidebarBtn element={FormElements.ParagraphField} />
                <SidebarBtn element={FormElements.DateField} />
                <SidebarBtn element={FormElements.TextAreaField} />
                <SidebarBtn element={FormElements.NumberField} />
              </div>
            </div>
          </div>
      }
    </div>
  )
}
