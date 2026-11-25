import { Clock, DollarSign, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { UserAvatar } from './UserAvatar'
import { formatAmount, formatRelativeTime } from '../lib/utils'
import type { Task } from '../types'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Link to={`/tasks/${task.id}`}>
      <Card hover className="group flex flex-col gap-3 h-full">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="status" status={task.status}>{task.status}</Badge>
          <span className="text-sorowork-blue font-semibold text-sm whitespace-nowrap">
            {formatAmount(task.rewardAmount, task.token)}
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-white group-hover:text-sorowork-blue transition-colors line-clamp-2 leading-snug">
            {task.title}
          </h3>
          <p className="text-sm text-white/50 mt-1 line-clamp-2">{task.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {task.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="tag">{tag}</Badge>
          ))}
          {task.tags.length > 3 && (
            <Badge variant="tag">+{task.tags.length - 3}</Badge>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <UserAvatar user={task.creator} size="sm" />
            <span className="text-xs text-white/50">{task.creator.username}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-white/40">
            <Clock size={12} />
            {formatRelativeTime(task.createdAt)}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export function TaskCardSkeleton() {
  return (
    <div className="card p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex justify-between">
        <div className="h-5 w-16 bg-white/10 rounded" />
        <div className="h-5 w-24 bg-white/10 rounded" />
      </div>
      <div>
        <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
        <div className="h-3 bg-white/5 rounded w-full mb-1" />
        <div className="h-3 bg-white/5 rounded w-5/6" />
      </div>
      <div className="flex gap-1.5">
        <div className="h-5 w-12 bg-white/10 rounded" />
        <div className="h-5 w-16 bg-white/10 rounded" />
      </div>
      <div className="flex justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/10" />
          <div className="h-3 w-16 bg-white/10 rounded" />
        </div>
        <div className="h-3 w-12 bg-white/5 rounded" />
      </div>
    </div>
  )
}
