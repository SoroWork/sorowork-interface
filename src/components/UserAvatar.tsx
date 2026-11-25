import { type HTMLAttributes } from 'react'
import { cn } from '../lib/utils'
import type { User } from '../types'

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'username' | 'avatarUrl' | 'walletAddress'>
  size?: 'sm' | 'md' | 'lg'
}

export function UserAvatar({ user, size = 'md', className, ...props }: UserAvatarProps) {
  const sizeClass = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  }[size]

  const initials = user.username?.slice(0, 2).toUpperCase() || user.walletAddress?.slice(0, 2).toUpperCase() || '??'

  const colorHash = (user.walletAddress || user.username || '').charCodeAt(0) % 5
  const colors = [
    'from-purple-500 to-indigo-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-pink-500',
    'from-sorowork-purple to-sorowork-blue',
  ]

  return (
    <div
      className={cn('rounded-full flex items-center justify-center font-semibold text-white', sizeClass, !user.avatarUrl && `bg-gradient-to-br ${colors[colorHash]}`, className)}
      {...props}
    >
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={user.username} className="w-full h-full rounded-full object-cover" />
      ) : (
        initials
      )}
    </div>
  )
}
