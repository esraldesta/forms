
import FormBuilder from '@/components/forms/FormBuilder'
import { GetFormById } from '@/lib/actions'
import React from 'react'

export default async function Page({ params }: {
  params: {
    id: string
  }
}) {

  const { id } = await params
  const form = await GetFormById(Number(id))
  if (!form) {
    throw new Error("Form not found")
  }
  return (
    <FormBuilder form={form}/>
  )
}
