import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup'

  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-gradient-to-b from-black/80 via-black/60 to-transparent">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-sm bg-netflix-red" />
          <span className="text-lg font-semibold tracking-wide">
            Netflix<span className="text-netflix-red">Clone</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {isAuthenticated && !isAuthPage && (
            <span className="hidden text-netflix-gray md:inline">
              {user?.email}
            </span>
          )}

          {!isAuthenticated && (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `rounded px-3 py-1.5 text-xs font-medium ${
                    isActive
                      ? 'bg-white text-black'
                      : 'text-netflix-gray hover:text-white'
                  }`
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="rounded bg-netflix-red px-3 py-1.5 text-xs font-medium hover:bg-red-700"
              >
                Sign Up
              </NavLink>
            </div>
          )}

          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              className="rounded bg-netflix-red px-3 py-1.5 text-xs font-medium hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

