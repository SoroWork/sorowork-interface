import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Bell, CheckCheck } from 'lucide-react'
import { notificationsApi } from '../lib/api'
import { Button } from '../components/ui/Button'
import { formatRelativeTime } from '../lib/utils'
import { cn } from '../lib/utils'

export function Notifications() {
  const qc = useQueryClient()
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.list().then((r) => r.data),
  })

  const { mutate: markRead } = useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const { mutate: markAllRead } = useMutation({
    mutationFn: () => notificationsApi.markAllRead(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const unreadCount = notifications?.filter((n) => !n.read).length || 0

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-white/50 text-sm mt-1">{unreadCount} unread</p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={() => markAllRead()}>
            <CheckCheck size={15} />
            Mark all read
          </Button>
        )}
      </div>

      <div className="card divide-y divide-white/5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 flex gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-24" />
              </div>
            </div>
          ))
        ) : notifications?.length ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className={cn('p-4 flex gap-3 cursor-pointer hover:bg-white/5 transition-colors', !n.read && 'bg-sorowork-purple/5')}
              onClick={() => !n.read && markRead(n.id)}
            >
              <div className={cn('w-2 h-2 rounded-full mt-2 shrink-0', n.read ? 'bg-white/20' : 'bg-sorowork-blue')} />
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm', n.read ? 'text-white/60' : 'text-white')}>{n.message}</p>
                <p className="text-xs text-white/30 mt-0.5">{formatRelativeTime(n.createdAt)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center">
            <Bell size={32} className="mx-auto text-white/20 mb-3" />
            <p className="text-white/40">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
