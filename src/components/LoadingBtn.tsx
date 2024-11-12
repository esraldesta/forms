import React from 'react'
import { Button } from './ui/button'

export default function LoadingBtn({ pending }: {
    pending: boolean
}) {

    return (
        <Button className='my-5' >{pending ? "Loading" : "Submit"}</Button>
    )
}
