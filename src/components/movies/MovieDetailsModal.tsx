import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getMovieDetails } from '../../services/omdbService'
import type { OmdbMovieDetail } from '../../types/omdb'

type MovieDetailsModalProps = {
  imdbID: string | null
  onClose: () => void
}

export const MovieDetailsModal = ({ imdbID, onClose }: MovieDetailsModalProps) => {
  const [movie, setMovie] = useState<OmdbMovieDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!imdbID) return

    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getMovieDetails(imdbID)
        setMovie(data)
      } catch {
        setError('Failed to load movie details.')
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [imdbID])

  return (
    <AnimatePresence>
      {imdbID && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-md bg-netflix-dark shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-zinc-800 p-4">
              <div>
                <h2 className="text-lg font-semibold">{movie?.Title}</h2>
                <p className="text-xs text-netflix-gray">
                  {movie?.Year} • {movie?.Runtime} • {movie?.Genre}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded bg-zinc-800 px-2 py-1 text-xs hover:bg-zinc-700"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-4 p-4 md:flex-row">
              {movie?.Poster && movie.Poster !== 'N/A' && (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="h-64 w-full max-w-xs rounded-md object-cover md:h-80"
                />
              )}

              <div className="space-y-3 text-sm">
                {loading && <p className="text-netflix-gray">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && movie && (
                  <>
                    <p className="text-sm text-zinc-200">{movie.Plot}</p>
                    <p className="text-xs text-netflix-gray">
                      <span className="font-semibold text-zinc-300">
                        Cast:
                      </span>{' '}
                      {movie.Actors}
                    </p>
                    <p className="text-xs text-netflix-gray">
                      <span className="font-semibold text-zinc-300">
                        Director:
                      </span>{' '}
                      {movie.Director}
                    </p>
                    {movie.imdbRating && (
                      <p className="text-xs text-netflix-gray">
                        <span className="font-semibold text-zinc-300">
                          IMDb Rating:
                        </span>{' '}
                        {movie.imdbRating} ({movie.imdbVotes} votes)
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

