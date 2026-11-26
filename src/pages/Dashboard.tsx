import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  Plus,
  Briefcase,
  Clock,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Star,
  Send,
  Eye,
  ArrowUpRight,
  FileCheck,
  Users,
  Activity,
  Award,
  Trophy,
  Filter,
  BarChart3,
  Target,
  Zap,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { tasksApi, submissionsApi, feedApi, communitiesApi, profilesApi } from '../lib/api'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { UserAvatar } from '../components/UserAvatar'
import { formatAmount, formatDate, formatRelativeTime, getStatusColor } from '../lib/utils'
import { useWallet } from '../hooks/useWallet'
import type { Task, Submission, FeedActivity, TaskStatus } from '../types'

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  color,
  bgColor,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  change?: string
  color: string
  bgColor: string
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-white/50 mb-1">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-1.5">
              <TrendingUp size={12} className="text-green-400" />
              <span className="text-xs text-green-400">{change}</span>
            </div>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center shrink-0`}>
          <Icon size={18} className={color} />
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${bgColor}`} />
    </Card>
  )
}

function QuickAction({
  icon: Icon,
  label,
  description,
  to,
  color,
}: {
  icon: React.ElementType
  label: string
  description: string
  to: string
  color: string
}) {
  return (
    <Link to={to} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
      <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center shrink-0`}>
        <Icon size={16} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium group-hover:text-sorowork-blue transition-colors">{label}</p>
        <p className="text-xs text-white/40">{description}</p>
      </div>
      <ChevronRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors shrink-0" />
    </Link>
  )
}

function ReputationMeter({ reputation, rank }: { reputation: number; rank?: number }) {
  const nextTier = reputation < 50 ? 50 : reputation < 200 ? 200 : reputation < 500 ? 500 : 1000
  const tierName = reputation < 50 ? 'Newcomer' : reputation < 200 ? 'Active' : reputation < 500 ? 'Expert' : 'Legend'
  const nextTierName = reputation < 50 ? 'Active' : reputation < 200 ? 'Expert' : reputation < 500 ? 'Legend' : 'Legend+'
  const progress = Math.min((reputation / nextTier) * 100, 100)

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star size={16} className="text-yellow-400" />
          <h3 className="font-semibold text-sm">Reputation</h3>
        </div>
        {rank && (
          <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded">Rank #{rank}</span>
        )}
      </div>
      <div className="flex items-end gap-3 mb-4">
        <span className="text-3xl font-bold">{reputation}</span>
        <span className="text-sm text-sorowork-purple-light font-medium mb-1">{tierName}</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-white/40">
          <span>{tierName}</span>
          <span>{nextTierName} ({nextTier})</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sorowork-purple to-sorowork-blue rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-white/30">{nextTier - reputation} points to next tier</p>
      </div>
    </Card>
  )
}

function SubmissionsReceived({ tasks }: { tasks: Task[] }) {
  const tasksWithSubmissions = tasks.filter((t) => t.submissions && t.submissions.length > 0)
  const pendingReviews = tasksWithSubmissions
    .flatMap((t) => (t.submissions || []).map((s) => ({ ...s, task: t })))
    .filter((s) => s.status === 'PENDING')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <Card className="p-0">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck size={16} className="text-yellow-400" />
          <h3 className="font-semibold text-sm">Pending Reviews</h3>
        </div>
        <Badge variant="default">{pendingReviews.length} pending</Badge>
      </div>
      <div className="divide-y divide-white/5">
        {pendingReviews.length === 0 ? (
          <div className="p-6 text-center text-white/40 text-sm">
            <CheckCircle size={24} className="mx-auto mb-2 text-green-400/40" />
            <p>All caught up! No submissions waiting for review.</p>
          </div>
        ) : (
          pendingReviews.slice(0, 5).map((sub) => (
            <Link
              key={sub.id}
              to={`/tasks/${sub.task.id}`}
              className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors group"
            >
              <UserAvatar user={sub.contributor} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium group-hover:text-sorowork-blue transition-colors truncate">
                  {sub.contributor.username} submitted to <span className="text-white/60">{sub.task.title}</span>
                </p>
                <p className="text-xs text-white/30 mt-0.5">{formatRelativeTime(sub.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-sorowork-blue font-medium">{formatAmount(sub.task.rewardAmount, sub.task.token)}</span>
                <Eye size={14} className="text-white/20" />
              </div>
            </Link>
          ))
        )}
      </div>
    </Card>
  )
}

function MySubmissions({ contributions }: { contributions: Submission[] }) {
  const sorted = [...contributions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <Card className="p-0">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Send size={16} className="text-sorowork-blue" />
          <h3 className="font-semibold text-sm">Your Submissions</h3>
        </div>
        <span className="text-xs text-white/40">{contributions.length} total</span>
      </div>
      <div className="divide-y divide-white/5">
        {sorted.length === 0 ? (
          <div className="p-6 text-center text-white/40 text-sm">
            <Send size={24} className="mx-auto mb-2 text-sorowork-blue/40" />
            <p>No submissions yet.</p>
            <Link to="/discover" className="text-sorowork-blue text-xs hover:underline mt-1 block">
              Find bounties to work on →
            </Link>
          </div>
        ) : (
          sorted.slice(0, 5).map((sub) => (
            <Link
              key={sub.id}
              to={`/tasks/${sub.taskId}`}
              className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium group-hover:text-sorowork-blue transition-colors truncate">
                  {sub.task?.title || 'Task'}
                </p>
                <p className="text-xs text-white/30 mt-0.5">{formatRelativeTime(sub.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {sub.task && (
                  <span className="text-xs text-sorowork-blue font-medium">{formatAmount(sub.task.rewardAmount, sub.task.token)}</span>
                )}
                <Badge variant="status" status={sub.status}>{sub.status}</Badge>
              </div>
            </Link>
          ))
        )}
      </div>
    </Card>
  )
}

function RecentActivity({ activities }: { activities: FeedActivity[] }) {
  const activityConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
    TASK_CREATED: { icon: Plus, color: 'text-sorowork-blue', label: 'created' },
    WORK_SUBMITTED: { icon: Send, color: 'text-yellow-400', label: 'submitted to' },
    WORK_APPROVED: { icon: CheckCircle, color: 'text-green-400', label: 'approved' },
    TIP_SENT: { icon: DollarSign, color: 'text-sorowork-purple-light', label: 'tipped' },
    USER_JOINED: { icon: Users, color: 'text-white/60', label: 'joined' },
  }

  return (
    <Card className="p-0">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-sorowork-purple-light" />
          <h3 className="font-semibold text-sm">Recent Activity</h3>
        </div>
        <Link to="/feed" className="text-xs text-sorowork-blue hover:underline">View all</Link>
      </div>
      <div className="divide-y divide-white/5">
        {activities.length === 0 ? (
          <div className="p-6 text-center text-white/40 text-sm">No recent activity</div>
        ) : (
          activities.slice(0, 6).map((a) => {
            const cfg = activityConfig[a.type] || activityConfig.USER_JOINED
            const Icon = cfg.icon
            return (
              <div key={a.id} className="px-4 py-3 flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0`}>
                  <Icon size={12} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/70 truncate">
                    <span className="font-medium text-white/90">{a.user.username}</span>
                    {' '}{cfg.label}{' '}
                    {a.task && <span className="text-white/60">{a.task.title}</span>}
                  </p>
                  <p className="text-[10px] text-white/30 mt-0.5">{formatRelativeTime(a.createdAt)}</p>
                </div>
                {a.amount && <span className="text-xs text-sorowork-blue font-medium shrink-0">{formatAmount(a.amount)}</span>}
              </div>
            )
          })
        )}
      </div>
    </Card>
  )
}

function EarningsBreakdown({ tasks }: { tasks: Task[] }) {
  const approved = tasks.filter((t) => t.status === 'APPROVED')
  const totalPaid = approved.reduce((sum, t) => sum + parseFloat(t.rewardAmount), 0)
  const avgBounty = approved.length > 0 ? totalPaid / approved.length : 0

  const tagCounts: Record<string, { count: number; total: number }> = {}
  approved.forEach((t) => {
    t.tags.forEach((tag) => {
      if (!tagCounts[tag]) tagCounts[tag] = { count: 0, total: 0 }
      tagCounts[tag].count++
      tagCounts[tag].total += parseFloat(t.rewardAmount)
    })
  })
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 5)

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={16} className="text-green-400" />
        <h3 className="font-semibold text-sm">Earnings Breakdown</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-xs text-white/40">Total Paid Out</p>
          <p className="text-lg font-bold text-green-400">${totalPaid.toFixed(0)}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-xs text-white/40">Avg. Bounty</p>
          <p className="text-lg font-bold">${avgBounty.toFixed(0)}</p>
        </div>
      </div>
      {topTags.length > 0 && (
        <div>
          <p className="text-xs text-white/40 mb-2">Top Categories</p>
          <div className="space-y-2">
            {topTags.map(([tag, { count, total }]) => {
              const pct = totalPaid > 0 ? (total / totalPaid) * 100 : 0
              return (
                <div key={tag}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70">{tag}</span>
                    <span className="text-white/40">{count} tasks · ${total.toFixed(0)}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sorowork-purple to-sorowork-blue rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {topTags.length === 0 && (
        <p className="text-xs text-white/40 text-center py-2">Complete bounties to see your earnings breakdown</p>
      )}
    </Card>
  )
}

function BountyStatusPipeline({ tasks }: { tasks: Task[] }) {
  const statuses: Array<{ key: TaskStatus; label: string; color: string; dotColor: string }> = [
    { key: 'OPEN', label: 'Open', color: 'bg-green-400/10 border-green-400/20', dotColor: 'bg-green-400' },
    { key: 'ASSIGNED', label: 'Assigned', color: 'bg-blue-400/10 border-blue-400/20', dotColor: 'bg-blue-400' },
    { key: 'SUBMITTED', label: 'Submitted', color: 'bg-yellow-400/10 border-yellow-400/20', dotColor: 'bg-yellow-400' },
    { key: 'APPROVED', label: 'Completed', color: 'bg-sorowork-blue/10 border-sorowork-blue/20', dotColor: 'bg-sorowork-blue' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {statuses.map(({ key, label, color, dotColor }) => {
        const count = tasks.filter((t) => t.status === key).length
        return (
          <div key={key} className={`rounded-xl border p-3 ${color}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${dotColor}`} />
              <span className="text-xs text-white/60">{label}</span>
            </div>
            <p className="text-xl font-bold">{count}</p>
          </div>
        )
      })}
    </div>
  )
}

export function Dashboard() {
  const { user, address } = useWallet()
  const [taskFilter, setTaskFilter] = useState<TaskStatus | 'ALL'>('ALL')

  const { data: tasksData } = useQuery({
    queryKey: ['my-tasks'],
    queryFn: () => tasksApi.list().then((r) => r.data),
    enabled: Boolean(user),
  })

  const { data: contributions } = useQuery({
    queryKey: ['my-contributions', address],
    queryFn: () => profilesApi.contributions(address!).then((r) => r.data),
    enabled: Boolean(address),
  })

  const { data: feedData } = useQuery({
    queryKey: ['feed'],
    queryFn: () => feedApi.list(1).then((r) => r.data),
    enabled: Boolean(user),
  })

  const { data: communities } = useQuery({
    queryKey: ['communities'],
    queryFn: () => communitiesApi.list().then((r) => r.data),
    enabled: Boolean(user),
  })

  const tasks = tasksData?.data || []
  const myContributions = contributions || []
  const activities = feedData?.data || []

  const openTasks = tasks.filter((t) => t.status === 'OPEN').length
  const pendingReviews = tasks.filter((t) => t.status === 'SUBMITTED').length
  const approved = tasks.filter((t) => t.status === 'APPROVED').length
  const totalPaid = tasks
    .filter((t) => t.status === 'APPROVED')
    .reduce((sum, t) => sum + parseFloat(t.rewardAmount), 0)
  const totalEarned = myContributions
    .filter((c) => c.status === 'APPROVED')
    .reduce((sum, c) => sum + parseFloat(c.task?.rewardAmount || '0'), 0)

  const filteredTasks =
    taskFilter === 'ALL' ? tasks : tasks.filter((t) => t.status === taskFilter)

  if (!user) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sorowork-purple/20 to-sorowork-blue/20 border border-white/10 flex items-center justify-center mx-auto mb-6">
          <Briefcase size={28} className="text-sorowork-purple-light" />
        </div>
        <h2 className="text-xl font-bold mb-2">Connect your wallet</h2>
        <p className="text-white/50 mb-6 max-w-md mx-auto">
          Connect your Freighter wallet to access your dashboard — manage bounties, track submissions, and view your earnings.
        </p>
        <Link to="/discover"><Button variant="gradient">Browse Bounties</Button></Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
          <p className="text-white/50 text-sm mt-1">
            Welcome back, <span className="text-white/70">{user.username}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/discover">
            <Button variant="secondary" size="sm">
              <Briefcase size={14} />
              Find Work
            </Button>
          </Link>
          <Link to="/tasks/create">
            <Button variant="gradient" size="sm">
              <Plus size={14} />
              Post Bounty
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={Briefcase}
          label="Active Bounties"
          value={openTasks}
          color="text-sorowork-purple-light"
          bgColor="bg-sorowork-purple/20"
        />
        <StatCard
          icon={Clock}
          label="Pending Review"
          value={pendingReviews}
          change={pendingReviews > 0 ? `${pendingReviews} need attention` : undefined}
          color="text-yellow-400"
          bgColor="bg-yellow-500/20"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed"
          value={approved}
          color="text-green-400"
          bgColor="bg-green-500/20"
        />
        <StatCard
          icon={DollarSign}
          label="Total Paid Out"
          value={`$${totalPaid.toFixed(0)}`}
          color="text-sorowork-blue"
          bgColor="bg-sorowork-blue/20"
        />
        <StatCard
          icon={Award}
          label="Total Earned"
          value={`$${totalEarned.toFixed(0)}`}
          color="text-emerald-400"
          bgColor="bg-emerald-500/20"
        />
      </div>

      {/* Pipeline */}
      <BountyStatusPipeline tasks={tasks} />

      {/* Quick Actions + Reputation */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-sorowork-blue" />
            <h3 className="font-semibold text-sm">Quick Actions</h3>
          </div>
          <div className="space-y-1">
            <QuickAction
              icon={Plus}
              label="Post a Bounty"
              description="Create a new task with escrow"
              to="/tasks/create"
              color="bg-sorowork-purple"
            />
            <QuickAction
              icon={Briefcase}
              label="Find Work"
              description="Browse available bounties"
              to="/discover"
              color="bg-sorowork-blue/80"
            />
            <QuickAction
              icon={Users}
              label="Communities"
              description="Join or create a community"
              to="/communities"
              color="bg-green-500/80"
            />
            <QuickAction
              icon={Trophy}
              label="Leaderboard"
              description="Check your ranking"
              to="/leaderboard"
              color="bg-yellow-500/80"
            />
            <QuickAction
              icon={Eye}
              label="Your Profile"
              description="View public portfolio"
              to={`/profile/${address}`}
              color="bg-pink-500/80"
            />
          </div>
        </Card>

        <div className="lg:col-span-1">
          <ReputationMeter reputation={user.reputation} />
        </div>

        <div className="lg:col-span-1">
          <EarningsBreakdown tasks={tasks} />
        </div>
      </div>

      {/* Submissions Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SubmissionsReceived tasks={tasks} />
        <MySubmissions contributions={myContributions} />
      </div>

      {/* Your Bounties */}
      <Card className="p-0">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-sorowork-purple-light" />
            <h2 className="font-semibold">Your Bounties</h2>
            <span className="text-xs text-white/40">({tasks.length} total)</span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {(['ALL', 'OPEN', 'ASSIGNED', 'SUBMITTED', 'APPROVED'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setTaskFilter(s)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
                  taskFilter === s
                    ? 'bg-sorowork-purple/20 text-white border-sorowork-purple/40'
                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                }`}
              >
                {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {filteredTasks.length === 0 && (
            <div className="p-8 text-center text-white/40">
              <Briefcase size={28} className="mx-auto mb-2 text-white/20" />
              <p className="text-sm">
                {taskFilter === 'ALL'
                  ? 'No bounties posted yet.'
                  : `No ${taskFilter.toLowerCase()} bounties.`}
              </p>
              <Link to="/tasks/create" className="text-sorowork-blue text-sm hover:underline mt-2 block">
                Post your first bounty →
              </Link>
            </div>
          )}
          {filteredTasks.map((task) => (
            <Link
              key={task.id}
              to={`/tasks/${task.id}`}
              className="p-4 flex items-center gap-3 hover:bg-white/[0.03] transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm group-hover:text-sorowork-blue transition-colors truncate">
                    {task.title}
                  </span>
                  {task.submissions && task.submissions.length > 0 && (
                    <span className="text-[10px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded shrink-0">
                      {task.submissions.length} submission{task.submissions.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-white/40">{formatDate(task.createdAt)}</p>
                  <div className="flex gap-1">
                    {task.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm text-sorowork-blue font-medium">
                  {formatAmount(task.rewardAmount, task.token)}
                </span>
                <Badge variant="status" status={task.status}>{task.status}</Badge>
                <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Activity + Communities */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentActivity activities={activities} />

        <Card className="p-0">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-green-400" />
              <h3 className="font-semibold text-sm">Communities</h3>
            </div>
            <Link to="/communities" className="text-xs text-sorowork-blue hover:underline">Browse all</Link>
          </div>
          <div className="divide-y divide-white/5">
            {(!communities || communities.length === 0) ? (
              <div className="p-6 text-center text-white/40 text-sm">
                <Users size={24} className="mx-auto mb-2 text-green-400/40" />
                <p>Not in any communities yet.</p>
                <Link to="/communities" className="text-sorowork-blue text-xs hover:underline mt-1 block">
                  Explore communities →
                </Link>
              </div>
            ) : (
              communities.slice(0, 4).map((c) => (
                <Link
                  key={c.id}
                  to={`/communities/${c.id}`}
                  className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors group"
                >
                  {c.logoUrl ? (
                    <img src={c.logoUrl} alt={c.name} className="w-8 h-8 rounded-lg object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sorowork-purple to-sorowork-blue flex items-center justify-center font-bold text-white text-xs">
                      {c.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium group-hover:text-sorowork-blue transition-colors truncate">{c.name}</p>
                    <p className="text-xs text-white/40">{c.memberCount || 0} members · {c.taskCount || 0} tasks</p>
                  </div>
                  <ChevronRight size={14} className="text-white/20 shrink-0" />
                </Link>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
