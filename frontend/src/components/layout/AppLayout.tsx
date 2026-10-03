import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Navbar from './Navbar'

/**
 * Shared page chrome: navbar, the routed page, and the footer.
 *
 * Every route except `/login` and `/register` renders inside this shell; the
 * auth pages use their own centred layout so they can drop the navigation.
 */
export default function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}