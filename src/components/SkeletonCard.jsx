function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton w-28 h-20 flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="skeleton h-3 w-16" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-20 mt-auto" />
      </div>
    </div>
  )
}

export default SkeletonCard