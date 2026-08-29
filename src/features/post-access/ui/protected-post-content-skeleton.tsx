import { Skeleton } from '@/shared/ui/skeleton'

type ProtectedPostContentSkeletonProps = {
  label: string
}

export const ProtectedPostContentSkeleton = ({ label }: ProtectedPostContentSkeletonProps) => (
  <output aria-label={label} className="flex flex-col gap-4 py-4">
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </output>
)
