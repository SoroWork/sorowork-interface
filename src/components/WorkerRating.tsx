import { Star } from 'lucide-react'

interface WorkerRatingProps {
  reputation: number
  tasksCompleted: number
  size?: 'sm' | 'md'
}

function getReputationTier(rep: number): { label: string; color: string } {
  if (rep >= 90) return { label: 'Expert', color: 'text-yellow-400' }
  if (rep >= 70) return { label: 'Skilled', color: 'text-blue-400' }
  if (rep >= 40) return { label: 'Reliable', color: 'text-green-400' }
  return { label: 'Newcomer', color: 'text-white/40' }
}

export function WorkerRating({ reputation, tasksCompleted, size = 'md' }: WorkerRatingProps) {
  const tier = getReputationTier(reputation)
  const stars = Math.round(reputation / 20)

  return (
    <div className={`flex items-center gap-2 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size === 'sm' ? 12 : 14}
            className={i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}
          />
        ))}
      </div>
      <span className={tier.color}>{tier.label}</span>
      <span className="text-white/30">({tasksCompleted} tasks)</span>
    </div>
  )
}
