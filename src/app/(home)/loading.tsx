import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <Loader className='animate-spin h-12 w-12'/>
        </div>
    )
}
