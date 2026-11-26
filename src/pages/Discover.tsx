import { useState } from 'react'
import { Search, Filter, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'
import { TaskCard, TaskCardSkeleton } from '../components/TaskCard'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import type { TaskStatus } from '../types'

const STATUS_FILTERS: Array<{ label: string; value: TaskStatus | 'ALL' }> = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Assigned', value: 'ASSIGNED' },
  { label: 'Submitted', value: 'SUBMITTED' },
  { label: 'Approved', value: 'APPROVED' },
]

const POPULAR_TAGS = ['Cleaning', 'Road Repair', 'Landscaping', 'Painting', 'Plumbing', 'Electrical', 'Construction', 'Delivery']

export function Discover() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<TaskStatus | 'ALL'>('ALL')
  const [selectedTag, setSelectedTag] = useState<string | undefined>()

  const { data, isLoading, error } = useTasks({
    search: search || undefined,
    status: status !== 'ALL' ? status : undefined,
    tag: selectedTag,
  })

  const tasks = data?.data || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Discover Bounties</h1>
          <p className="text-white/50 text-sm mt-1">Find community tasks, do the work, earn USDC</p>
        </div>
        <Link to="/tasks/create">
          <Button variant="gradient" size="md">
            <Plus size={16} />
            Post Bounty
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            className="input-field w-full pl-9"
            placeholder="Search bounties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="secondary" size="md">
          <Filter size={16} />
          Filters
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatus(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              status === f.value
                ? 'bg-sorowork-purple/20 text-white border-sorowork-purple/40'
                : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <span className="text-xs text-white/40 self-center">Tags:</span>
        {POPULAR_TAGS.map((tag) => (
          <Badge
            key={tag}
            variant="tag"
            className={selectedTag === tag ? 'bg-sorowork-purple/20 text-sorowork-purple-light border-sorowork-purple/40' : ''}
            onClick={() => setSelectedTag(selectedTag === tag ? undefined : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {error && (
        <div className="card p-4 text-red-400 text-sm">
          Failed to load tasks. Make sure the backend is running.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <TaskCardSkeleton key={i} />)
          : tasks.map((task) => <TaskCard key={task.id} task={task} />)
        }
        {!isLoading && tasks.length === 0 && (
          <div className="col-span-3 text-center py-16 text-white/40">
            <p className="text-lg mb-2">No bounties found</p>
            <p className="text-sm">Try a different filter or be the first to post a bounty!</p>
          </div>
        )}
      </div>
    </div>
  )
}
