export type OmdbSearchItem = {
  imdbID: string
  Title: string
  Year: string
  Type: 'movie' | 'series' | 'episode' | string
  Poster: string
}

export type OmdbSearchResponse = {
  Search?: OmdbSearchItem[]
  totalResults?: string
  Response: 'True' | 'False'
  Error?: string
}

export type OmdbMovieDetail = {
  imdbID: string
  Title: string
  Year: string
  Rated?: string
  Released?: string
  Runtime?: string
  Genre?: string
  Director?: string
  Writer?: string
  Actors?: string
  Plot?: string
  Language?: string
  Country?: string
  Awards?: string
  Poster: string
  Ratings?: { Source: string; Value: string }[]
  Metascore?: string
  imdbRating?: string
  imdbVotes?: string
  Type: string
  totalSeasons?: string
}

