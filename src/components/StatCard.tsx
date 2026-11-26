import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: { value: number; label: string }
  className?: string
}

export function StatCard({ label, value, icon: Icon, trend, className = '' }: StatCardProps) {
  return (
    <div className={`card p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-white/40 font-medium">{label}</span>
        <Icon size={16} className="text-white/20" />
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {trend && (
        <p className={`text-xs mt-1 ${trend.value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
        </p>
      )}
    </div>
  )
}
