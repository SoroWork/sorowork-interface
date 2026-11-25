import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Users, Briefcase, CheckCircle, DollarSign, ShieldCheck } from 'lucide-react'
import { adminApi } from '../lib/api'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { UserAvatar } from '../components/UserAvatar'
import { Button } from '../components/ui/Button'
import { formatAmount } from '../lib/utils'
import { useWallet } from '../hooks/useWallet'
import { Link } from 'react-router-dom'

export function Admin() {
  const { user } = useWallet()
  const qc = useQueryClient()

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.stats().then((r) => r.data),
    enabled: user?.role === 'ADMIN',
  })

  const { data: users } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => adminApi.users().then((r) => r.data),
    enabled: user?.role === 'ADMIN',
  })

  const { mutate: updateRole } = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => adminApi.updateUserRole(id, role),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  })

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="text-center py-16">
        <ShieldCheck size={48} className="mx-auto text-white/20 mb-4" />
        <p className="text-white/50">You need admin access to view this page.</p>
        <Link to="/discover" className="text-sorowork-blue text-sm hover:underline mt-2 block">
          Back to Discover
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
        <p className="text-white/50 text-sm mt-1">Platform management and analytics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Users', value: stats?.totalUsers || 0, color: 'bg-sorowork-purple' },
          { icon: Briefcase, label: 'Total Tasks', value: stats?.totalTasks || 0, color: 'bg-sorowork-blue/80' },
          { icon: CheckCircle, label: 'Submissions', value: stats?.totalSubmissions || 0, color: 'bg-green-500/80' },
          { icon: DollarSign, label: 'Total Paid', value: formatAmount(stats?.totalPaid || '0'), color: 'bg-yellow-500/80' },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label} className="flex items-center gap-3 p-4">
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
              <Icon size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-white/50">{label}</p>
              <p className="text-lg font-bold">{value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-4 border-b border-white/5">
          <h2 className="font-semibold">Users ({users?.length || 0})</h2>
        </div>
        <div className="divide-y divide-white/5">
          {users?.map((u) => (
            <div key={u.id} className="p-4 flex items-center gap-3">
              <UserAvatar user={u} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{u.username}</p>
                <p className="text-xs text-white/40 font-mono truncate">{u.walletAddress}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="default">{u.role}</Badge>
                {u.role !== 'ADMIN' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateRole({ id: u.id, role: u.role === 'CREATOR' ? 'CONTRIBUTOR' : 'CREATOR' })}
                  >
                    Toggle Role
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
