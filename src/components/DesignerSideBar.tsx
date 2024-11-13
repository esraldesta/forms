import React from 'react'
import { FormElements } from './forms/FormElements'
import SidebarBtn from './SidebarBtn'

export default function DesignerSideBar() {

  return (
    <div className='col-span-2 md:col-span-1 bg-accent p-1 bt border-t-[1px] border-blue-200'>
      <div className='grid grid-cols-2 gap-2'>
        <SidebarBtn element={FormElements.TextField} />
      </div>
    </div>
  )
}
