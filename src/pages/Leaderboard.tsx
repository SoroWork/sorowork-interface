import { useQuery } from '@tanstack/react-query'
import { Trophy, Star, Briefcase, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'
import { leaderboardApi } from '../lib/api'
import { UserAvatar } from '../components/UserAvatar'
import { formatAmount } from '../lib/utils'

export function Leaderboard() {
  const { data: entries, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => leaderboardApi.get().then((r) => r.data),
  })

  const medalColors = ['text-yellow-400', 'text-gray-300', 'text-orange-400']

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Leaderboard</h1>
        <p className="text-white/50 text-sm mt-1">Top contributors ranked by reputation</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="card p-4 flex items-center gap-4 animate-pulse">
              <div className="w-8 h-5 bg-white/10 rounded" />
              <div className="w-9 h-9 rounded-full bg-white/10" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 bg-white/10 rounded w-28" />
                <div className="h-3 bg-white/5 rounded w-20" />
              </div>
              <div className="h-4 w-16 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {entries?.map((entry, idx) => (
            <Link
              key={entry.user.id}
              to={`/profile/${entry.user.walletAddress}`}
              className="card-hover p-4 flex items-center gap-4 group"
            >
              <div className={`w-8 text-center font-bold text-lg ${medalColors[idx] || 'text-white/40'}`}>
                {idx < 3 ? <Trophy size={20} className="mx-auto" /> : entry.rank}
              </div>

              <UserAvatar user={entry.user} size="md" />

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm group-hover:text-sorowork-blue transition-colors truncate">
                  {entry.user.username}
                </p>
                <div className="flex items-center gap-3 text-xs text-white/40 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Star size={10} className="text-yellow-400" />
                    {entry.user.reputation} rep
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={10} />
                    {entry.taskCount} tasks
                  </span>
                </div>
              </div>

              <span className="text-sorowork-blue font-semibold text-sm shrink-0">
                {formatAmount(entry.totalEarned)}
              </span>
            </Link>
          ))}
          {!entries?.length && (
            <p className="text-white/40 text-center py-16">No contributors yet</p>
          )}
        </div>
      )}
    </div>
  )
}
