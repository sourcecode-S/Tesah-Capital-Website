import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <Skeleton className="h-8 w-64" /> {/* Title skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-[120px] w-full rounded-lg" /> {/* Card skeleton */}
        <Skeleton className="h-[120px] w-full rounded-lg" /> {/* Card skeleton */}
        <Skeleton className="h-[120px] w-full rounded-lg" /> {/* Card skeleton */}
        <Skeleton className="h-[120px] w-full rounded-lg" /> {/* Card skeleton */}
      </div>
      <Skeleton className="h-[400px] w-full rounded-lg" /> {/* Tabs/Chart skeleton */}
    </div>
  )
}
