import CreateFormBtn from '@/components/CreateFormBtn'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { GetForms, GetFormStats } from '@/lib/actions'
import { Form } from '@prisma/client'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { ArrowBigRight, ArrowDownRightFromCircleIcon, ClipboardCheck, Edit, Folder, View } from 'lucide-react'
import React, { ReactNode, Suspense } from 'react'
import { formatDistance } from "date-fns"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
export default function Home() {
  return (
    <div className='container mx-auto pt-4'>
      <Suspense fallback={
        <StatsCards loading={true} />
      }>
        <CardStatsWrapper />
      </Suspense>
      <Separator className='my-6' />
      <h2 className='text-4xl font-bold col-span-2'>Your forms</h2>
      <Separator className='my-6' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateFormBtn />
        <Suspense fallback={[1, 2, 3, 4].map(el => <FormCardSkeleton key={el} />)}>
          <FormCards />
        </Suspense>
      </div>
    </div>
  )
}


async function CardStatsWrapper() {
  const stats = await GetFormStats()
  return (
    <StatsCards loading={false} data={stats} />
  )
}
interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>
  loading: boolean
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props
  return <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
    <StatsCard
      title="Total Visits"
      icon={<View className='text-blue-600' />}
      helperText={"All time for visits"}
      value={data?.visits.toLocaleString() || ""}
      loading={loading}
      className="shadow-md shadow-blue-600"
    />

    <StatsCard
      title="Total submission"
      icon={<Folder className='text-green-600' />}
      helperText={"All time submission rate"}
      value={data?.submissions.toLocaleString() || ""}
      loading={loading}
      className="shadow-md shadow-green-600"
    />

    <StatsCard
      title="Bounce Rate"
      icon={<ArrowDownRightFromCircleIcon className='text-red-600' />}
      helperText={"All time bounce rate"}
      value={data?.bounceRate.toLocaleString() + "%" || ""}
      loading={loading}
      className="shadow-md shadow-red-600"
    />

    <StatsCard
      title="Submission Rate"
      icon={<ClipboardCheck className='text-yellow-600' />}
      helperText={"All time for submissionsRate"}
      value={data?.submissionsRate.toLocaleString() + "%" || ""}
      loading={loading}
      className="shadow-md shadow-yellow-600"
    />



  </div>
}

export function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className
}: {
  title: string,
  icon: ReactNode,
  helperText: string,
  value: string,
  loading: boolean,
  className: string,
}) {
  return (
    <Card className={className}>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {
            loading && <Skeleton>
              <span className='opacity-0'>0</span>
            </Skeleton>
          }
          {!loading && value}
        </div>
        <p className='text-xs text-muted-foreground pt-1'>{helperText}</p>
      </CardContent>
    </Card>)
}


function FormCardSkeleton() {
  return <Skeleton className='border-2 border-primary-/20 h-[190px] w-full'></Skeleton>
}

async function FormCards() {
  const forms = await GetForms();

  return <>
    {
      forms.map(form => (
        <FormCard key={form.id} form={form} />
      ))
    }
  </>
}

function FormCard({ form }: {
  form: Form
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 justify-between'>
          <span className='truncate font-bold'>{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={'destructive'}>Draft</Badge>}
        </CardTitle>
        <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true
          })}
          {
            form.published && (
              <span className='flex items-center gap-2'>
                <View className='text-muted-foreground' />
                <span>{form.visits.toLocaleString()}</span>
                <Folder className='text-muted-foreground' />
                <span>{form.submissions.toLocaleString()}</span>
              </span>
            )
          }
        </CardDescription>
      </CardHeader>

      <CardContent className='h-[20px] truncate text-sm text-muted-foreground '>
        {
          form.description || "No description"
        }
      </CardContent>

      <CardFooter>
        {
          form.published && (
            <Button asChild>
              <Link href={`/forms/${form.id}`}>View submissions <ArrowBigRight />
              </Link>
            </Button>
          )
        }

        {
          !form.published && (
            <Button asChild variant={'secondary'}>
              <Link href={`/builder/${form.id}`}>Edit Form <Edit />
              </Link>
            </Button>
          )
        }
      </CardFooter>
    </Card>
  )
}