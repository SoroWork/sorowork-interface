import { useParams } from 'react-router-dom'
import { Star, Award, Briefcase, Calendar } from 'lucide-react'
import { useProfile, useContributions } from '../hooks/useProfile'
import { UserAvatar } from '../components/UserAvatar'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { truncateAddress, formatAmount, formatDate } from '../lib/utils'

export function Profile() {
  const { walletAddress } = useParams<{ walletAddress: string }>()
  const { data: profile, isLoading } = useProfile(walletAddress || null)
  const { data: contributions } = useContributions(walletAddress || null)

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="card p-6 flex gap-4">
          <div className="w-20 h-20 rounded-full bg-white/10" />
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-white/10 rounded w-32" />
            <div className="h-3 bg-white/5 rounded w-48" />
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return <div className="text-white/50 text-center py-16">Profile not found</div>
  }

  const totalEarned = contributions
    ?.filter((c) => c.status === 'APPROVED')
    .reduce((sum, c) => sum + parseFloat(c.task?.rewardAmount || '0'), 0) || 0

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="flex gap-5 items-start">
          <UserAvatar user={profile} size="lg" className="w-20 h-20 text-2xl shrink-0" />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{profile.username}</h1>
            <p className="text-sm text-white/40 font-mono mt-0.5">{truncateAddress(profile.walletAddress, 8)}</p>
            {profile.bio && <p className="text-sm text-white/70 mt-2">{profile.bio}</p>}
            <div className="flex items-center gap-4 mt-3 text-sm text-white/60">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-yellow-400" />
                <span>{profile.reputation} rep</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-sorowork-blue" />
                <span>{contributions?.length || 0} tasks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award size={14} className="text-sorowork-purple-light" />
                <span>{formatAmount(totalEarned)} earned</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>Joined {formatDate(profile.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="font-semibold mb-3">Contributions ({contributions?.length || 0})</h2>
        <div className="space-y-3">
          {contributions?.map((sub) => (
            <Card key={sub.id} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{sub.task?.title || 'Task'}</p>
                <p className="text-xs text-white/40 mt-0.5">{formatDate(sub.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {sub.task && (
                  <span className="text-sorowork-blue text-sm font-medium">
                    {formatAmount(sub.task.rewardAmount, sub.task.token)}
                  </span>
                )}
                <Badge variant="status" status={sub.status}>{sub.status}</Badge>
              </div>
            </Card>
          ))}
          {!contributions?.length && (
            <p className="text-white/40 text-sm text-center py-8">No contributions yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
