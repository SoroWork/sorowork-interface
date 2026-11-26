export const TASK_CATEGORIES = [
  { id: 'cleanup', label: 'Community Cleanup', icon: 'Trash2' },
  { id: 'repair', label: 'Road & Infrastructure Repair', icon: 'Wrench' },
  { id: 'landscaping', label: 'Landscaping & Gardening', icon: 'Flower2' },
  { id: 'painting', label: 'Painting & Beautification', icon: 'Paintbrush' },
  { id: 'construction', label: 'Light Construction', icon: 'Hammer' },
  { id: 'environmental', label: 'Environmental Restoration', icon: 'TreePine' },
  { id: 'maintenance', label: 'Public Space Maintenance', icon: 'Settings' },
  { id: 'safety', label: 'Safety Improvements', icon: 'ShieldCheck' },
] as const

export const TASK_STATUS_LABELS: Record<string, string> = {
  OPEN: 'Open',
  ASSIGNED: 'In Progress',
  SUBMITTED: 'Under Review',
  APPROVED: 'Completed',
  CANCELLED: 'Cancelled',
}

export const TASK_STATUS_COLORS: Record<string, string> = {
  OPEN: 'bg-green-500/20 text-green-400',
  ASSIGNED: 'bg-blue-500/20 text-blue-400',
  SUBMITTED: 'bg-yellow-500/20 text-yellow-400',
  APPROVED: 'bg-purple-500/20 text-purple-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
}

export const STELLAR_NETWORK = {
  testnet: 'https://soroban-testnet.stellar.org',
  mainnet: 'https://soroban.stellar.org',
  horizon_testnet: 'https://horizon-testnet.stellar.org',
  horizon_mainnet: 'https://horizon.stellar.org',
} as const

export const PAGINATION_DEFAULTS = {
  pageSize: 12,
  maxPageSize: 50,
} as const
