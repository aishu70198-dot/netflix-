import { useEffect, useMemo, useState } from 'react'
import { searchMovies } from '../services/omdbService'
import type { OmdbSearchItem } from '../types/omdb'
import { useDebounce } from './useDebounce'

type UseOmdbSearchArgs = {
  initialQuery?: string
}

export const useOmdbSearch = ({ initialQuery = '' }: UseOmdbSearchArgs) => {
  const [query, setQuery] = useState(initialQuery)
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<OmdbSearchItem[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    setPage(1)
  }, [debouncedQuery])

  useEffect(() => {
    const run = async () => {
      const currentQuery = debouncedQuery.trim()
      if (!currentQuery) {
        setItems([])
        setTotalResults(0)
        setError(null)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const data = await searchMovies({ query: currentQuery, page })

        if (data.Response === 'False') {
          setItems([])
          setTotalResults(0)
          setError(data.Error || 'No results found.')
          return
        }

        setItems(data.Search ?? [])
        setTotalResults(Number(data.totalResults ?? '0'))
      } catch (err) {
        setItems([])
        setTotalResults(0)
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to fetch movies. Please check your API key and try again.'
        setError(errorMessage)
        // eslint-disable-next-line no-console
        console.error('Movie search error:', err)
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [debouncedQuery, page])

  const totalPages = useMemo(() => {
    if (!totalResults) return 0
    return Math.min(Math.ceil(totalResults / 10), 100)
  }, [totalResults])

  const canGoNext = page < totalPages
  const canGoPrev = page > 1

  return {
    query,
    setQuery,
    page,
    setPage,
    items,
    totalResults,
    totalPages,
    canGoNext,
    canGoPrev,
    loading,
    error,
  }
}

