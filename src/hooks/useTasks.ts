import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksApi, submissionsApi } from '../lib/api'
import type { Task } from '../types'

export function useTasks(params?: { status?: string; tag?: string; search?: string; page?: number }) {
  return useQuery({
    queryKey: ['tasks', params],
    queryFn: () => tasksApi.list(params).then((r) => r.data),
  })
}

export function useTask(id: string) {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => tasksApi.get(id).then((r) => r.data),
    enabled: Boolean(id),
  })
}

export function useCreateTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Task>) => tasksApi.create(data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  })
}

export function useSubmitWork() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { taskId: string; evidenceUrl: string; description?: string }) =>
      submissionsApi.submit(data).then((r) => r.data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['tasks', variables.taskId] })
      qc.invalidateQueries({ queryKey: ['submissions', variables.taskId] })
    },
  })
}

export function useTaskSubmissions(taskId: string) {
  return useQuery({
    queryKey: ['submissions', taskId],
    queryFn: () => submissionsApi.getByTask(taskId).then((r) => r.data),
    enabled: Boolean(taskId),
  })
}

export function useApproveSubmission() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => submissionsApi.approve(id).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['submissions'] }),
  })
}
