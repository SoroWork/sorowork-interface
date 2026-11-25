import { NavLink } from 'react-router-dom'
import {
  Compass,
  LayoutDashboard,
  Users,
  Trophy,
  Activity,
  Bell,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useWallet } from '../../hooks/useWallet'

const links = [
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/communities', label: 'Communities', icon: Users },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/feed', label: 'Activity', icon: Activity },
  { to: '/notifications', label: 'Notifications', icon: Bell },
]

export function Sidebar() {
  const { user } = useWallet()

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-white/10 min-h-screen pt-6 px-3 gap-1">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-sorowork-purple/20 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5',
            )
          }
        >
          <Icon size={16} />
          {label}
        </NavLink>
      ))}
      {user?.role === 'ADMIN' && (
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mt-auto mb-2',
              isActive ? 'bg-sorowork-purple/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/5',
            )
          }
        >
          <ShieldCheck size={16} />
          Admin
        </NavLink>
      )}
    </aside>
  )
}
