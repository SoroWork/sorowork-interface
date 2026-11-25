import { useQuery } from '@tanstack/react-query'
import { Plus, Briefcase, Clock, CheckCircle, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'
import { tasksApi, submissionsApi } from '../lib/api'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { formatAmount, formatDate } from '../lib/utils'
import { useWallet } from '../hooks/useWallet'

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-white/50">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </Card>
  )
}

export function Dashboard() {
  const { user } = useWallet()
  const { data: tasksData } = useQuery({
    queryKey: ['my-tasks'],
    queryFn: () => tasksApi.list().then((r) => r.data),
    enabled: Boolean(user),
  })

  const tasks = tasksData?.data || []
  const openTasks = tasks.filter((t) => t.status === 'OPEN').length
  const pendingReviews = tasks.filter((t) => t.status === 'SUBMITTED').length
  const approved = tasks.filter((t) => t.status === 'APPROVED').length
  const totalPaid = tasks
    .filter((t) => t.status === 'APPROVED')
    .reduce((sum, t) => sum + parseFloat(t.rewardAmount), 0)

  if (!user) {
    return (
      <div className="text-center py-16">
        <p className="text-white/50 mb-4">Connect your wallet to access the dashboard</p>
        <Link to="/discover"><Button variant="gradient">Browse Bounties</Button></Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
          <p className="text-white/50 text-sm mt-1">Welcome back, {user.username}</p>
        </div>
        <Link to="/tasks/create">
          <Button variant="gradient">
            <Plus size={16} />
            Post Bounty
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Briefcase} label="Active Bounties" value={openTasks} color="bg-sorowork-purple" />
        <StatCard icon={Clock} label="Pending Review" value={pendingReviews} color="bg-yellow-500/80" />
        <StatCard icon={CheckCircle} label="Approved" value={approved} color="bg-green-500/80" />
        <StatCard icon={DollarSign} label="Total Paid" value={`$${totalPaid.toFixed(0)}`} color="bg-sorowork-blue/80" />
      </div>

      <Card>
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-semibold">Your Bounties</h2>
          <span className="text-xs text-white/40">{tasks.length} total</span>
        </div>
        <div className="divide-y divide-white/5">
          {tasks.length === 0 && (
            <div className="p-8 text-center text-white/40">
              <p>No bounties posted yet.</p>
              <Link to="/tasks/create" className="text-sorowork-blue text-sm hover:underline mt-2 block">
                Post your first bounty →
              </Link>
            </div>
          )}
          {tasks.map((task) => (
            <div key={task.id} className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors">
              <div className="flex-1 min-w-0">
                <Link to={`/tasks/${task.id}`} className="font-medium text-sm hover:text-sorowork-blue transition-colors truncate block">
                  {task.title}
                </Link>
                <p className="text-xs text-white/40 mt-0.5">{formatDate(task.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm text-sorowork-blue font-medium">
                  {formatAmount(task.rewardAmount, task.token)}
                </span>
                <Badge variant="status" status={task.status}>{task.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
