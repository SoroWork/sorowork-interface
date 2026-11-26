import { MapPin, DollarSign, Users } from 'lucide-react'
import { Task } from '../types'
import { TASK_STATUS_COLORS, TASK_STATUS_LABELS } from '../lib/constants'
import { formatUSDC, formatRelativeTime } from '../lib/format'

interface TaskCardProps {
  task: Task
  onClick?: () => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div
      onClick={onClick}
      className="card p-5 cursor-pointer hover:border-white/20 transition-all group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TASK_STATUS_COLORS[task.status]}`}>
          {TASK_STATUS_LABELS[task.status]}
        </span>
        <span className="text-xs text-white/30">{formatRelativeTime(task.createdAt)}</span>
      </div>

      <h3 className="font-semibold text-white group-hover:text-sorowork-cyan transition-colors mb-2 line-clamp-2">
        {task.title}
      </h3>
      <p className="text-sm text-white/40 line-clamp-2 mb-4">{task.description}</p>

      <div className="flex items-center gap-4 text-xs text-white/50">
        <span className="flex items-center gap-1">
          <DollarSign size={12} />
          {formatUSDC(task.rewardAmount)}
        </span>
        {task.location && (
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {task.location.address}
          </span>
        )}
        {task.submissions && (
          <span className="flex items-center gap-1">
            <Users size={12} />
            {task.submissions.length}
          </span>
        )}
      </div>

      {task.tags.length > 0 && (
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {task.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/30">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function TaskCardSkeleton() {
  return (
    <div className="card p-5 animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-4 w-20 bg-white/10 rounded-full" />
        <div className="h-4 w-16 bg-white/10 rounded" />
      </div>
      <div className="h-5 w-3/4 bg-white/10 rounded" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-white/5 rounded" />
        <div className="h-3 w-5/6 bg-white/5 rounded" />
      </div>
      <div className="flex gap-3">
        <div className="h-4 w-20 bg-white/5 rounded" />
        <div className="h-4 w-24 bg-white/5 rounded" />
      </div>
    </div>
  )
}
