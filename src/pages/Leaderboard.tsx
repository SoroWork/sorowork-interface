import { Trophy, Medal, Star, TrendingUp } from 'lucide-react'
import { truncateAddress } from '../lib/format'

const MOCK_LEADERS = [
  { rank: 1, username: 'GreenThumb', address: 'GBZX...UQAH', tasks: 47, earned: 4820, reputation: 96 },
  { rank: 2, username: 'CityFixer', address: 'GCNV...RKMJ', tasks: 38, earned: 3650, reputation: 91 },
  { rank: 3, username: 'ParkRanger', address: 'GDMX...HTPQ', tasks: 31, earned: 2890, reputation: 88 },
  { rank: 4, username: 'StreetSweep', address: 'GAKL...WNZS', tasks: 25, earned: 2100, reputation: 82 },
  { rank: 5, username: 'TrailBlazer', address: 'GBQR...KFED', tasks: 22, earned: 1850, reputation: 79 },
]

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-sorowork-navy text-white">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Community Leaderboard</h1>
          <p className="text-white/40">Top workers making a real difference in their communities</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {MOCK_LEADERS.slice(0, 3).map((leader, i) => (
            <div key={leader.rank} className={`card p-5 text-center ${i === 0 ? 'ring-1 ring-yellow-500/30' : ''}`}>
              <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                i === 0 ? 'bg-yellow-500/20' : i === 1 ? 'bg-gray-400/20' : 'bg-orange-500/20'
              }`}>
                {i === 0 ? <Trophy size={20} className="text-yellow-400" /> :
                 i === 1 ? <Medal size={20} className="text-gray-400" /> :
                 <Star size={20} className="text-orange-400" />}
              </div>
              <p className="font-semibold text-sm">{leader.username}</p>
              <p className="text-xs text-white/30 font-mono mt-1">{leader.address}</p>
              <div className="mt-3 flex justify-center gap-4 text-xs text-white/50">
                <span>{leader.tasks} tasks</span>
                <span>{leader.earned} USDC</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs">
                <th className="text-left py-3 px-4">Rank</th>
                <th className="text-left py-3 px-4">Worker</th>
                <th className="text-right py-3 px-4">Tasks</th>
                <th className="text-right py-3 px-4">Earned</th>
                <th className="text-right py-3 px-4">Reputation</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERS.map(leader => (
                <tr key={leader.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-mono text-white/50">#{leader.rank}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{leader.username}</span>
                    <span className="text-white/30 text-xs ml-2 font-mono">{leader.address}</span>
                  </td>
                  <td className="py-3 px-4 text-right">{leader.tasks}</td>
                  <td className="py-3 px-4 text-right text-sorowork-cyan">{leader.earned} USDC</td>
                  <td className="py-3 px-4 text-right">
                    <span className="flex items-center justify-end gap-1">
                      <TrendingUp size={12} className="text-green-400" />
                      {leader.reputation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
