interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className = '', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`animate-pulse bg-white/10 rounded ${className}`} />
      ))}
    </>
  )
}

export function CardSkeleton() {
  return (
    <div className="card p-5 space-y-3 animate-pulse">
      <div className="flex justify-between">
        <div className="h-4 w-20 bg-white/10 rounded" />
        <div className="h-4 w-16 bg-white/10 rounded" />
      </div>
      <div className="h-5 w-3/4 bg-white/10 rounded" />
      <div className="h-3 w-full bg-white/5 rounded" />
      <div className="h-3 w-5/6 bg-white/5 rounded" />
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-white/5 rounded" />
        <div className="h-5 w-16 bg-white/5 rounded" />
      </div>
    </div>
  )
}
