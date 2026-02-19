import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginPage = () => {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = (values: LoginFormValues) => {
    // Demo auth: accept any credentials and store email
    login(values.email)
    const redirectTo = (location.state as { from?: Location })?.from?.pathname
    navigate(redirectTo || '/', { replace: true })
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded bg-black/70 p-8 shadow-xl">
        <h1 className="mb-6 text-2xl font-semibold">Sign In</h1>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-netflix-gray">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="rounded bg-netflix-dark px-3 py-2 text-sm outline-none ring-1 ring-transparent focus:ring-netflix-red"
              placeholder="you@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-netflix-gray">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="rounded bg-netflix-dark px-3 py-2 text-sm outline-none ring-1 ring-transparent focus:ring-netflix-red"
              placeholder="Enter password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 flex h-10 items-center justify-center rounded bg-netflix-red text-sm font-medium hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-800"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-xs text-netflix-gray">
          New to Netflix Clone?{' '}
          <Link
            to="/signup"
            className="text-white hover:underline"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  )
}

