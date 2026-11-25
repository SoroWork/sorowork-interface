import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { profilesApi } from '../lib/api'
import type { User } from '../types'

export function useProfile(walletAddress: string | null) {
  return useQuery({
    queryKey: ['profile', walletAddress],
    queryFn: () => profilesApi.get(walletAddress!).then((r) => r.data),
    enabled: Boolean(walletAddress),
  })
}

export function useUpdateProfile() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<User>) => profilesApi.update(data).then((r) => r.data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['profile', data.walletAddress] })
    },
  })
}

export function useContributions(walletAddress: string | null) {
  return useQuery({
    queryKey: ['contributions', walletAddress],
    queryFn: () => profilesApi.contributions(walletAddress!).then((r) => r.data),
    enabled: Boolean(walletAddress),
  })
}
