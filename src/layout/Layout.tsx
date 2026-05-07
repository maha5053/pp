import { Outlet } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

