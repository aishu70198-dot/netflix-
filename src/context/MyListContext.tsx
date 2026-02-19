import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { OmdbSearchItem } from '../types/omdb'

export type MyListItem = OmdbSearchItem

type MyListContextValue = {
  items: MyListItem[]
  isInList: (imdbID: string) => boolean
  addToList: (item: MyListItem) => void
  removeFromList: (imdbID: string) => void
}

const MyListContext = createContext<MyListContextValue | undefined>(undefined)

type MyListProviderProps = {
  children: ReactNode
}

const STORAGE_KEY = 'netflix_clone_my_list'

export const MyListProvider = ({ children }: MyListProviderProps) => {
  const [items, setItems] = useLocalStorage<MyListItem[]>(STORAGE_KEY, [])

  const isInList = useCallback(
    (imdbID: string) => items.some((item) => item.imdbID === imdbID),
    [items],
  )

  const addToList = useCallback(
    (item: MyListItem) => {
      setItems((prev) => {
        if (prev.some((existing) => existing.imdbID === item.imdbID)) {
          return prev
        }
        return [item, ...prev]
      })
    },
    [setItems],
  )

  const removeFromList = useCallback(
    (imdbID: string) => {
      setItems((prev) => prev.filter((item) => item.imdbID !== imdbID))
    },
    [setItems],
  )

  const value = useMemo(
    () => ({
      items,
      isInList,
      addToList,
      removeFromList,
    }),
    [items, isInList, addToList, removeFromList],
  )

  return (
    <MyListContext.Provider value={value}>{children}</MyListContext.Provider>
  )
}

export { MyListContext }

