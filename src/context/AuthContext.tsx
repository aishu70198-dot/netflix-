import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export type AuthUser = {
  email: string
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

const AUTH_STORAGE_KEY = 'netflix_clone_auth_user'

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [storedUser, setStoredUser] = useLocalStorage<AuthUser | null>(
    AUTH_STORAGE_KEY,
    null,
  )
  const [user, setUser] = useState<AuthUser | null>(storedUser)

  useEffect(() => {
    setUser(storedUser)
  }, [storedUser])

  const login = useCallback(
    (email: string) => {
      const authUser: AuthUser = { email }
      setStoredUser(authUser)
      setUser(authUser)
    },
    [setStoredUser],
  )

  const logout = useCallback(() => {
    setStoredUser(null)
    setUser(null)
  }, [setStoredUser])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }

