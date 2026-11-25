import { type HTMLAttributes } from 'react'
import { cn, getStatusColor } from '../../lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'status' | 'tag'
  status?: string
}

export function Badge({ className, variant = 'default', status, children, ...props }: BadgeProps) {
  const statusClass = status ? getStatusColor(status) : ''

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
        variant === 'default' && 'bg-sorowork-purple/20 text-sorowork-purple-light border-sorowork-purple/30',
        variant === 'status' && statusClass,
        variant === 'tag' && 'bg-white/10 text-white/70 border-white/10 hover:bg-white/20 cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
