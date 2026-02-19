type PaginationProps = {
  page: number
  totalPages: number
  canGoPrev: boolean
  canGoNext: boolean
  onPageChange: (page: number) => void
}

export const Pagination = ({
  page,
  totalPages,
  canGoPrev,
  canGoNext,
  onPageChange,
}: PaginationProps) => {
  if (!totalPages || totalPages <= 1) return null

  return (
    <div className="mt-4 flex items-center justify-between text-xs text-netflix-gray">
      <button
        type="button"
        disabled={!canGoPrev}
        onClick={() => onPageChange(page - 1)}
        className="rounded bg-netflix-dark px-2 py-1 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <span>
        Page <span className="text-white">{page}</span> of{' '}
        <span className="text-white">{totalPages}</span>
      </span>
      <button
        type="button"
        disabled={!canGoNext}
        onClick={() => onPageChange(page + 1)}
        className="rounded bg-netflix-dark px-2 py-1 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  )
}

