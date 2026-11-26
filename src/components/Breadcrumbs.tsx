import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const routeLabels: Record<string, string> = {
  discover: 'Discover',
  feed: 'Feed',
  communities: 'Communities',
  leaderboard: 'Leaderboard',
  dashboard: 'Dashboard',
  profile: 'Profile',
  tasks: 'Tasks',
  settings: 'Settings',
}

export function Breadcrumbs() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-white/40 mb-4">
      <Link to="/" className="hover:text-white/70 transition-colors">
        <Home size={14} />
      </Link>
      {segments.map((segment, i) => {
        const path = '/' + segments.slice(0, i + 1).join('/')
        const label = routeLabels[segment] || segment.replace(/-/g, ' ')
        const isLast = i === segments.length - 1

        return (
          <span key={path} className="flex items-center gap-1">
            <ChevronRight size={12} className="text-white/20" />
            {isLast ? (
              <span className="text-white/70">{label}</span>
            ) : (
              <Link to={path} className="hover:text-white/70 transition-colors capitalize">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
