import React from 'react'
import { FormElements } from './forms/FormElements'
import SidebarBtn from './SidebarBtn'
import useDesigner from '@/hooks/useDesigner'
import PropertiesFormSidebar from './forms/PropertiesFormSidebar'

export default function DesignerSideBar() {
  const { selectedElement } = useDesigner()
  return (
    <div className='h-full bg-background p-1 bt border-t-[1px] border-border'>
      {
        selectedElement ?
          <PropertiesFormSidebar />
          :
          <div className='flex flex-wrap justify-around gap-2'>
            <SidebarBtn element={FormElements.TextField} />
            <SidebarBtn element={FormElements.TitleField} />
            <SidebarBtn element={FormElements.SubTitleField} />
            <SidebarBtn element={FormElements.ParagraphField} />
            <SidebarBtn element={FormElements.SeparatorField} />
            <SidebarBtn element={FormElements.SpacerField} />
            <SidebarBtn element={FormElements.NumberField} />
            <SidebarBtn element={FormElements.TextAreaField} />
          </div>
      }
    </div>
  )
}
