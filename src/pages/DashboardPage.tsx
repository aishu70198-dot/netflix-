import { useState } from 'react'
import { useOmdbSearch } from '../hooks/useOmdbSearch'
import { useMyList } from '../hooks/useMyList'
import { SearchBar } from '../components/movies/SearchBar'
import { MovieGrid } from '../components/movies/MovieGrid'
import { MovieDetailsModal } from '../components/movies/MovieDetailsModal'
import { Pagination } from '../components/movies/Pagination'

export const DashboardPage = () => {
  const {
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
  } = useOmdbSearch({ initialQuery: 'Batman' })

  const { items: myList } = useMyList()
  const [selectedImdbId, setSelectedImdbId] = useState<string | null>(null)

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
  }

  return (
    <div className="space-y-6">
      <SearchBar value={query} onChange={setQuery} />

      {error && (
        <div className="rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {error}
        </div>
      )}

      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs text-netflix-gray">
          <span>Search Results</span>
          {totalResults > 0 && (
            <span>
              Showing page {page} of {totalPages} • {totalResults} results
            </span>
          )}
        </div>
        <MovieGrid
          movies={items}
          loading={loading}
          onOpenDetails={(imdbID) => setSelectedImdbId(imdbID)}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          onPageChange={handlePageChange}
        />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs text-netflix-gray">
          <span>My List</span>
          <span>{myList.length} titles</span>
        </div>

        {myList.length === 0 ? (
          <div className="flex min-h-[120px] items-center justify-center rounded-md border border-dashed border-zinc-700 bg-black/40">
            <p className="text-xs text-netflix-gray">
              Add movies to your list to see them here.
            </p>
          </div>
        ) : (
          <MovieGrid
            movies={myList}
            loading={false}
            onOpenDetails={(imdbID) => setSelectedImdbId(imdbID)}
          />
        )}
      </section>

      <MovieDetailsModal
        imdbID={selectedImdbId}
        onClose={() => setSelectedImdbId(null)}
      />
    </div>
  )
}

