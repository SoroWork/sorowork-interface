import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Users, Briefcase, Plus } from 'lucide-react'
import { communitiesApi } from '../lib/api'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function Communities() {
  const qc = useQueryClient()
  const { data: communities, isLoading } = useQuery({
    queryKey: ['communities'],
    queryFn: () => communitiesApi.list().then((r) => r.data),
  })

  const { mutate: join } = useMutation({
    mutationFn: (id: string) => communitiesApi.join(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['communities'] }),
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Communities</h1>
          <p className="text-white/50 text-sm mt-1">Join communities and collaborate on bounties</p>
        </div>
        <Button variant="gradient" size="md">
          <Plus size={16} />
          Create Community
        </Button>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-4 space-y-3 animate-pulse">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-lg bg-white/10" />
                <div className="h-4 bg-white/10 rounded w-28" />
              </div>
              <div className="h-3 bg-white/5 rounded" />
              <div className="h-3 bg-white/5 rounded w-5/6" />
              <div className="flex gap-4 pt-2 border-t border-white/5">
                <div className="h-3 bg-white/10 rounded w-16" />
                <div className="h-3 bg-white/10 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities?.map((community) => (
            <Card key={community.id} hover className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {community.logoUrl ? (
                  <img src={community.logoUrl} alt={community.name} className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sorowork-purple to-sorowork-blue flex items-center justify-center font-bold text-white">
                    {community.name.charAt(0)}
                  </div>
                )}
                <h3 className="font-semibold">{community.name}</h3>
              </div>

              {community.description && (
                <p className="text-sm text-white/60 line-clamp-2">{community.description}</p>
              )}

              <div className="flex gap-4 text-xs text-white/40 mt-auto pt-2 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {community.memberCount || 0} members
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={12} />
                  {community.taskCount || 0} tasks
                </span>
              </div>

              <Button variant="secondary" size="sm" onClick={() => join(community.id)}>
                Join Community
              </Button>
            </Card>
          ))}
          {!communities?.length && (
            <div className="col-span-3 text-center py-16 text-white/40">
              <p>No communities yet. Be the first to create one!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
