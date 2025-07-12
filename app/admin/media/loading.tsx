import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <Skeleton className="h-8 w-64" /> {/* Title skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-48" /> {/* Button skeleton */}
      </div>
      <Skeleton className="h-[400px] w-full rounded-lg" /> {/* Card/Media grid skeleton */}
    </div>
  )
}
