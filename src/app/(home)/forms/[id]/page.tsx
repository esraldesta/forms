
import FormLinkShare from '@/components/FormLinkShare'
import VisitBtn from '@/components/VisitBtn'
import { GetFormById, GetFormWithSubmission } from '@/lib/actions'
import React, { ReactNode } from 'react'
import { StatsCard } from '../../dashboard/page'
import { ArrowDownRightFromCircleIcon, ClipboardCheck, Folder, View } from 'lucide-react'
import { ElementsType, FormElementInstance } from '@/components/forms/FormElements'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDistance } from 'date-fns'
export default async function FormDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params
  const form = await GetFormById(Number(id))
  if (!form) {
    throw new Error("Form not found")
  }

  const { visits, submissions } = form

  let submissionsRate = 0;
  if (visits > 0) {
    submissionsRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionsRate;

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container mx-auto">
          <h1 className="text-4xl font-bold truncate ">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>

      <div className="py-4 border-b border-muted">
        <div className="container mx-auto flex gap-2 items-center justify-between">
          <div className="container flex gap-3 items-center justify-between">
            <FormLinkShare shareUrl={form.shareURL} />
          </div>
        </div>
      </div>
      <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto'>
        <StatsCard
          title="Total Visits"
          icon={<View className='text-blue-600' />}
          helperText={"All time for visits"}
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-blue-600"
        />

        <StatsCard
          title="Total submission"
          icon={<Folder className='text-green-600' />}
          helperText={"All time submission rate"}
          value={submissions.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-green-600"
        />

        <StatsCard
          title="Bounce Rate"
          icon={<ArrowDownRightFromCircleIcon className='text-red-600' />}
          helperText={"All time bounce rate"}
          value={bounceRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-red-600"
        />

        <StatsCard
          title="Submission Rate"
          icon={<ClipboardCheck className='text-yellow-600' />}
          helperText={"All time for submissionsRate"}
          value={submissionsRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />
      </div>
      <div className="container mx-auto pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  )
}

type Row = { [key: string]: string } & {
  submittedAt: Date;
}
async function SubmissionsTable({ id }: {
  id: number
}) {
  const form = await GetFormWithSubmission(id)

  if (!form) {
    throw new Error("Form not found")
  }
  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string,
    label: string,
    required: boolean,
    type: ElementsType
  }[] = []

  formElements.forEach(element => {
    switch (element.type) {
      case "TextField":
        columns.push({
          id: element.id,
          label: element.extraAttributes.label,
          required: element.extraAttributes.required,
          type: element.type
        })
        break;

      default:
        break;
    }
  })

  const rows: Row[] = [];
  form.FormSubmissions.forEach(submission => {
    const content = JSON.parse(submission.content)
    rows.push({
      ...content,
      submittedAt: submission.createdAt
    })
  })
  return (
    <>
      <h1 className='text-2xl font-bold my-4'>Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead key={column.id} className='uppercase'>
                  {column.label}
                </TableHead>
              ))}
              <TableHead className='text-muted-foreground text-right uppercase'>
                SubmitedAt
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              rows.map((row, index) => (
                <TableRow key={index}>{
                  columns.map(column => (
                    <RowCell key={column.id} type={column.type} value={row[column.id]} />
                  ))
                }
                  <TableCell className="text-muted-foreground text-right">

                    {formatDistance(row.submittedAt, new Date(), {
                      addSuffix: true
                    })}
                  </TableCell>

                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function RowCell({ type, value }: {
  type: ElementsType;
  value: string
}) {
  console.log(type);
  const node: ReactNode = value;
  return <TableCell>{node}</TableCell>
}