import type { ReactNode } from 'react'

interface HoverCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function HoverCard({ children, className = '', onClick }: HoverCardProps) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
      className={`
        group relative rounded-xl border border-white/5 bg-sorowork-navy-card
        transition-all duration-200 ease-out
        hover:border-sorowork-blue/30 hover:bg-sorowork-navy-hover
        hover:shadow-lg hover:shadow-sorowork-blue/5
        hover:-translate-y-0.5
        active:translate-y-0 active:shadow-md
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sorowork-blue/0 to-sorowork-blue/0 group-hover:from-sorowork-blue/5 group-hover:to-transparent transition-all duration-200 pointer-events-none" />
      <div className="relative">{children}</div>
    </div>
  )
}
