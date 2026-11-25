import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string, chars = 6): string {
  if (!address) return ''
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function formatAmount(amount: string | number, token = 'USDC'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return `${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${token}`
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return formatDate(dateStr)
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'OPEN': return 'text-green-400 bg-green-400/10 border-green-400/20'
    case 'ASSIGNED': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    case 'SUBMITTED': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    case 'APPROVED': return 'text-sorowork-blue bg-sorowork-blue/10 border-sorowork-blue/20'
    case 'CANCELLED': return 'text-red-400 bg-red-400/10 border-red-400/20'
    case 'PENDING': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    case 'REJECTED': return 'text-red-400 bg-red-400/10 border-red-400/20'
    default: return 'text-white/60 bg-white/5 border-white/10'
  }
}
