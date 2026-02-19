import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      <main className="pt-20 px-4 pb-10 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

