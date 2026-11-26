import { Bell, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { WalletButton } from '../WalletButton'
import { Logo } from '../Logo'
import { cn } from '../../lib/utils'

const navLinks = [
  { to: '/discover', label: 'Discover' },
  { to: '/feed', label: 'Feed' },
  { to: '/communities', label: 'Communities' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-sorowork-navy/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="shrink-0">
          <Logo size={30} />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'text-white bg-sorowork-purple/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/notifications" className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors relative">
            <Bell size={18} />
          </Link>
          <WalletButton />
          <button
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-sorowork-navy px-4 py-3 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive ? 'text-white bg-sorowork-purple/20' : 'text-white/60 hover:text-white hover:bg-white/5',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
