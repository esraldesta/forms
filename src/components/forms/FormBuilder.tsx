"use client"
import React, { useEffect, useState } from 'react'
import Designer from '@/components/Designer'
import DesignerSideBar from '@/components/DesignerSideBar'
import DragOverlayWrapper from '@/components/forms/DragOverlayWrapper'
import SaveBtn from '@/components/forms/SaveBtn'
import Preview from '@/components/Preview'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { Form } from '@prisma/client'
import useDesigner from '@/hooks/useDesigner'
import { ArrowLeft, ArrowRight, Loader } from 'lucide-react'
import PublishFormBtn from './PublishFormBtn'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import Confetti from 'react-confetti'
import { useToast } from '@/hooks/use-toast'

export default function FormBuilder({ form }: {
    form: Form
}) {
    const { toast } = useToast()
    const { setElements } = useDesigner()
    const [isReady, setIsReady] = useState(false)
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        }
    })
    const touchSensor = useSensor(TouchSensor,{
        activationConstraint:{
            distance:10
        }
    })
    const sensors = useSensors(mouseSensor, touchSensor)

    useEffect(() => {
        if (isReady) return;
        const elements = JSON.parse(form.content)
        setElements(elements)
        setIsReady(true)
    }, [form, setElements, isReady])

    if (!isReady) {
        return (<div className='flex flex-col items-center justify-center w-full h-full'>
            <Loader className='animate-spin h-12 w-12' />
        </div>)
    }
    const shareUrl = `${window.location.origin}/submit/${form.shareURL}`
    if (form.published) {
     return <>
            <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
            <div className='flex flex-col items-center justify-center h-full w-full'>
                <div className="max-w-md">
                    <h1 className='text-center text-4xl font-bold text-primary border-b pb-2 mb-10'>
                        Form Published
                    </h1>
                    <h2 className='text-2xl'>Share this form</h2>
                    <h3 className="text-xl text-muted-foreground border-b pb-10">
                        Anyone with the link can view and submit the form.
                    </h3>
                    <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
                        <Input className="w-full" readOnly value={shareUrl} />
                        <Button className='mt-2 w-full' onClick={() => {
                            navigator.clipboard.writeText(shareUrl)

                            toast(
                                {
                                    title:"Copied!",
                                    description:"Link Copied to clipboard"
                                }    
                               )
                        }}>Copy link</Button>
                    </div>
                    <div className="flex justify-between">
                        <Button variant={'link'} asChild>
                            <Link href={"/"} className='gap-2'><ArrowLeft />Go back Home</Link>
                        </Button>
                        <Button variant={'link'} asChild>
                            <Link href={`/forms/${form.id}`} className='gap-2'><ArrowRight />Form Details</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    }
    return (
        <div className='flex flex-col w-full grow'>
            <div className='flex justify-between px-2  md:px-5 py-5'>
                <p className='truncate'>Form: <span className='text-xs'>{form.name}</span></p>
                <div className='flex justify-end gap-x-1'>
                    <Preview />
                    {
                        !form.published &&
                        <>
                            <SaveBtn id={form.id} />
                            <PublishFormBtn id={form.id} />
                        </>
                    }
                </div>
            </div>

            <DndContext id={"111"} sensors={sensors}>
                <div className='grow h-[200px] bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
                    <ResizablePanelGroup direction="horizontal" className='h-full'>
                        <ResizablePanel defaultSize={73}>
                            <div className='overflow-y-auto h-full mx-5'>
                                <Designer />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={27} minSize={20}>
                            <div className='overflow-y-auto h-full'>
                                <DesignerSideBar />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>

                <DragOverlayWrapper />
            </DndContext>
        </div>
    )
}
