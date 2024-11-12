import React from 'react'
import { Button } from './ui/button'

export default function LoadingBtn({ pending }: {
    pending: boolean
}) {

    return (
        <Button className='mt-5' >{pending ? "Loading" : "Submit"}</Button>
    )
}
