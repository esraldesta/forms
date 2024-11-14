"use client"
import { formSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { CreateForm } from '@/lib/actions'
import { FilePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

type formSchemaType = z.infer<typeof formSchema>
export default function CreateFormBtn() {
    const router = useRouter()
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    });
    async function onSubmit(values: formSchemaType) {
        try {
            const formId = await CreateForm(values)
            // toast({
            //     title:"Success",
            //     description:"Form created successfully"
            // })
            router.push(`/builder/${formId}`)
        } catch (error) {
            // toast({
            //     title:"Error",
            //     description:"Something went wrong"
            //     variant:"destructive" 
            // })
            console.log(error);

        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} className='group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4'>
                    <FilePlus className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
                    <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>Create new form</p>
                </Button>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Form
                    </DialogTitle>
                    <DialogDescription>
                        Create  a new form to start collecting responses
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                        <FormField control={form.control} name='name' render={({ field }) => {
                            return (<FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} 
                                    value={field.value || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)
                        }} />

                        <FormField control={form.control} name='description' render={({ field }) => {
                            return (<FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea rows={5} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)
                        }} />



                    </form>
                </Form>
                <DialogFooter>
                    <Button disabled={form.formState.isSubmitting} className='w-full mt-4' onClick={form.handleSubmit(onSubmit)}>
                        {form.formState.isSubmitting ? "Saving" : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}
