import { motion } from 'framer-motion'
import type { OmdbSearchItem } from '../../types/omdb'
import { useMyList } from '../../hooks/useMyList'

type MovieCardProps = {
  movie: OmdbSearchItem
  onOpenDetails: (imdbID: string) => void
}

export const MovieCard = ({ movie, onOpenDetails }: MovieCardProps) => {
  const { isInList, addToList, removeFromList } = useMyList()
  const inList = isInList(movie.imdbID)

  const toggleList = () => {
    if (inList) {
      removeFromList(movie.imdbID)
    } else {
      addToList(movie)
    }
  }

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.04, y: -4 }}
      className="group relative cursor-pointer overflow-hidden rounded-md bg-netflix-dark shadow-md"
    >
      <button
        type="button"
        className="block w-full"
        onClick={() => onOpenDetails(movie.imdbID)}
      >
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-60 w-full items-center justify-center bg-zinc-800 text-xs text-netflix-gray">
            No poster available
          </div>
        )}
      </button>

      <div className="flex flex-col gap-1 p-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-1 font-medium">{movie.Title}</h3>
          <span className="shrink-0 text-[10px] text-netflix-gray">
            {movie.Year}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded border border-zinc-700 px-1.5 py-0.5 text-[10px] uppercase text-netflix-gray">
            {movie.Type}
          </span>
          <button
            type="button"
            onClick={toggleList}
            className="rounded bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white hover:bg-black"
          >
            {inList ? 'Remove from My List' : 'Add to My List'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

