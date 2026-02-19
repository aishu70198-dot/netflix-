export const MovieSkeletonCard = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-md bg-netflix-dark">
      <div className="h-60 w-full bg-zinc-800" />
      <div className="space-y-2 p-3">
        <div className="h-3 w-3/4 rounded bg-zinc-800" />
        <div className="flex gap-2">
          <div className="h-3 w-12 rounded bg-zinc-800" />
          <div className="h-3 flex-1 rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  )
}

