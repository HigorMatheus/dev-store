'use client'

import { Skeleton } from '@/components/skeleton'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SearchLoading() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        resultados para <span className="font-semibold">{query}</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <Suspense>
      <SearchLoading />
    </Suspense>
  )
}
