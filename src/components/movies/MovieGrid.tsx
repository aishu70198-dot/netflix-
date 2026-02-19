import type { OmdbSearchItem } from '../../types/omdb'
import { MovieCard } from './MovieCard'
import { MovieSkeletonCard } from './MovieSkeletonCard'

type MovieGridProps = {
  movies: OmdbSearchItem[]
  loading: boolean
  onOpenDetails: (imdbID: string) => void
}

export const MovieGrid = ({ movies, loading, onOpenDetails }: MovieGridProps) => {
  if (loading && movies.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <MovieSkeletonCard key={index} />
        ))}
      </div>
    )
  }

  if (!loading && movies.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-zinc-700 bg-black/40">
        <p className="text-sm text-netflix-gray">
          Start typing above to search for movies.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  )
}

