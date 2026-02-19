import axios from 'axios'

const OMDB_BASE_URL = 'https://www.omdbapi.com'

const apiKey = import.meta.env.VITE_OMDB_API_KEY

if (!apiKey) {
  // In dev, this helps surface misconfiguration early.
  // The UI will still handle errors gracefully.
  // eslint-disable-next-line no-console
  console.warn('VITE_OMDB_API_KEY is not defined in your environment.')
}

export const omdbClient = axios.create({
  baseURL: OMDB_BASE_URL,
  params: {
    apikey: apiKey,
  },
  timeout: 8000,
})

