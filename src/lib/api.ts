import axios from 'axios'
import type { Task, User, Submission, Community, Notification, FeedActivity, LeaderboardEntry, PaginatedResponse } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sorowork_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sorowork_token')
      localStorage.removeItem('sorowork_wallet')
    }
    return Promise.reject(err)
  },
)

// Auth
export const authApi = {
  register: (data: { walletAddress: string; username: string; signature: string }) =>
    api.post<{ token: string; user: User }>('/auth/register', data),
  login: (data: { walletAddress: string; signature: string }) =>
    api.post<{ token: string; user: User }>('/auth/login', data),
  me: () => api.get<User>('/auth/me'),
}

// Tasks
export const tasksApi = {
  list: (params?: { status?: string; tag?: string; search?: string; page?: number }) =>
    api.get<PaginatedResponse<Task>>('/tasks', { params }),
  get: (id: string) => api.get<Task>(`/tasks/${id}`),
  create: (data: Partial<Task>) => api.post<Task>('/tasks', data),
  update: (id: string, data: Partial<Task>) => api.put<Task>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
  assign: (id: string, contributorId: string) =>
    api.post<Task>(`/tasks/${id}/assign`, { contributorId }),
}

// Submissions
export const submissionsApi = {
  submit: (data: { taskId: string; evidenceUrl: string; description?: string }) =>
    api.post<Submission>('/submissions', data),
  getByTask: (taskId: string) => api.get<Submission[]>(`/submissions/task/${taskId}`),
  approve: (id: string) => api.put<Submission>(`/submissions/${id}/approve`),
  reject: (id: string) => api.put<Submission>(`/submissions/${id}/reject`),
}

// Profiles
export const profilesApi = {
  get: (walletAddress: string) => api.get<User>(`/profiles/${walletAddress}`),
  update: (data: Partial<User>) => api.put<User>('/profiles/me', data),
  contributions: (walletAddress: string) =>
    api.get<Submission[]>(`/profiles/${walletAddress}/contributions`),
}

// Communities
export const communitiesApi = {
  list: () => api.get<Community[]>('/communities'),
  get: (id: string) => api.get<Community>(`/communities/${id}`),
  create: (data: Partial<Community>) => api.post<Community>('/communities', data),
  join: (id: string) => api.post(`/communities/${id}/join`),
  tasks: (id: string) => api.get<Task[]>(`/communities/${id}/tasks`),
}

// Feed
export const feedApi = {
  list: (page = 1) => api.get<PaginatedResponse<FeedActivity>>('/feed', { params: { page } }),
}

// Leaderboard
export const leaderboardApi = {
  get: () => api.get<LeaderboardEntry[]>('/leaderboard'),
}

// Notifications
export const notificationsApi = {
  list: () => api.get<Notification[]>('/notifications'),
  markRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
}

// Admin
export const adminApi = {
  stats: () =>
    api.get<{
      totalUsers: number
      totalTasks: number
      totalSubmissions: number
      totalPaid: string
    }>('/admin/stats'),
  users: () => api.get<User[]>('/admin/users'),
  updateUserRole: (id: string, role: string) =>
    api.put<User>(`/admin/users/${id}/role`, { role }),
}

export default api
