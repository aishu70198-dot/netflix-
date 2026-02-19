import { omdbClient } from './apiClient'
import type { OmdbMovieDetail, OmdbSearchResponse } from '../types/omdb'

export type SearchMoviesParams = {
  query: string
  page?: number
}

export const searchMovies = async ({
  query,
  page = 1,
}: SearchMoviesParams): Promise<OmdbSearchResponse> => {
  const trimmed = query.trim()
  if (!trimmed) {
    return { Response: 'False', Search: [], totalResults: '0', Error: 'Empty query' }
  }

  try {
    const response = await omdbClient.get<OmdbSearchResponse>('', {
      params: {
        s: trimmed,
        page,
        type: 'movie',
      },
    })

    return response.data
  } catch (error) {
    // Handle axios errors
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: OmdbSearchResponse } }
      if (axiosError.response?.data) {
        return axiosError.response.data
      }
    }
    // Re-throw for the hook to handle
    throw error
  }
}

export const getMovieDetails = async (
  imdbID: string,
): Promise<OmdbMovieDetail> => {
  const response = await omdbClient.get<OmdbMovieDetail>('', {
    params: {
      i: imdbID,
      plot: 'full',
    },
  })

  return response.data
}

