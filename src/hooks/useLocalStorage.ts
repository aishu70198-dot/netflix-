import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type UseLocalStorageReturn<T> = [T, Dispatch<SetStateAction<T>>]

export function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // ignore write errors in demo app
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

