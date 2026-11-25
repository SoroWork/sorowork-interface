import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CheckCircle, PlusCircle, Send, Gift, UserPlus } from 'lucide-react'
import { feedApi } from '../lib/api'
import { UserAvatar } from '../components/UserAvatar'
import { formatAmount, formatRelativeTime } from '../lib/utils'
import { Button } from '../components/ui/Button'
import type { FeedActivity } from '../types'

const activityConfig = {
  TASK_CREATED: { icon: PlusCircle, color: 'text-sorowork-blue', label: 'created a bounty' },
  WORK_SUBMITTED: { icon: Send, color: 'text-yellow-400', label: 'submitted work for' },
  WORK_APPROVED: { icon: CheckCircle, color: 'text-green-400', label: 'got approved for' },
  TIP_SENT: { icon: Gift, color: 'text-sorowork-purple-light', label: 'sent a tip' },
  USER_JOINED: { icon: UserPlus, color: 'text-white/60', label: 'joined SoroWork' },
}

function ActivityItem({ activity }: { activity: FeedActivity }) {
  const cfg = activityConfig[activity.type] || activityConfig.USER_JOINED
  const Icon = cfg.icon

  return (
    <div className="flex gap-3 py-3 border-b border-white/5 last:border-0">
      <UserAvatar user={activity.user} size="sm" className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <Link to={`/profile/${activity.user.walletAddress}`} className="font-medium hover:text-sorowork-blue transition-colors">
            {activity.user.username}
          </Link>
          {' '}
          <span className="text-white/60">{cfg.label}</span>
          {activity.task && (
            <>
              {' '}
              <Link to={`/tasks/${activity.task.id}`} className={`font-medium ${cfg.color} hover:underline`}>
                {activity.task.title}
              </Link>
            </>
          )}
          {activity.amount && (
            <span className={`ml-1 font-medium ${cfg.color}`}>
              {formatAmount(activity.amount)}
            </span>
          )}
        </p>
        <p className="text-xs text-white/30 mt-0.5">{formatRelativeTime(activity.createdAt)}</p>
      </div>
      <Icon size={16} className={`shrink-0 mt-0.5 ${cfg.color}`} />
    </div>
  )
}

export function Feed() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['feed', page],
    queryFn: () => feedApi.list(page).then((r) => r.data),
  })

  const activities = data?.data || []
  const hasMore = activities.length > 0 && (data?.total || 0) > page * (data?.pageSize || 20)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Activity Feed</h1>
        <p className="text-white/50 text-sm mt-1">What's happening on SoroWork</p>
      </div>

      <div className="card p-4">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex gap-3 py-3 border-b border-white/5 animate-pulse">
                <div className="w-7 h-7 rounded-full bg-white/10 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
            {activities.length === 0 && (
              <p className="text-white/40 text-center py-8">No activity yet</p>
            )}
          </>
        )}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button variant="secondary" onClick={() => setPage((p) => p + 1)} loading={isFetching}>
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}
