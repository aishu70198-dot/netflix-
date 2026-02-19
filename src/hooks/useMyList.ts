import { useContext } from 'react'
import { MyListContext } from '../context/MyListContext'

export const useMyList = () => {
  const ctx = useContext(MyListContext)

  if (!ctx) {
    throw new Error('useMyList must be used within a MyListProvider')
  }

  return ctx
}

