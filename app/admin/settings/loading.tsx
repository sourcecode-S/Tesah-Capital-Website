import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <Skeleton className="h-8 w-64" /> {/* Title skeleton */}
      <Skeleton className="h-[200px] w-full rounded-lg" /> {/* Card skeleton 1 */}
      <Skeleton className="h-[150px] w-full rounded-lg" /> {/* Card skeleton 2 */}
      <Skeleton className="h-[100px] w-full rounded-lg" /> {/* Card skeleton 3 */}
    </div>
  )
}
