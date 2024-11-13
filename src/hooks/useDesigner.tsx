"use client"

import { DesignerContext } from '@/contexts/DesignerContext'
import{ useContext } from 'react'

export default function useDesigner() {
    const context = useContext(DesignerContext)
    if(!context){
        throw new Error("use Designer must be used within a DesignerContext")
    }
    return context
}
