export type TaskStatus = 'OPEN' | 'ASSIGNED' | 'SUBMITTED' | 'APPROVED' | 'CANCELLED'
export type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type UserRole = 'ADMIN' | 'CREATOR' | 'CONTRIBUTOR'

export interface User {
  id: string
  walletAddress: string
  username: string
  bio?: string
  avatarUrl?: string
  reputation: number
  role: UserRole
  createdAt: string
}

export interface Task {
  id: string
  title: string
  description: string
  rewardAmount: string
  token: string
  status: TaskStatus
  tags: string[]
  creatorId: string
  creator: User
  communityId?: string
  community?: Community
  contractTaskId?: number
  submissions?: Submission[]
  createdAt: string
}

export interface Submission {
  id: string
  taskId: string
  task?: Task
  contributorId: string
  contributor: User
  evidenceUrl: string
  description?: string
  status: SubmissionStatus
  createdAt: string
}

export interface Community {
  id: string
  name: string
  description?: string
  logoUrl?: string
  memberCount?: number
  taskCount?: number
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  type: string
  message: string
  read: boolean
  createdAt: string
}

export interface FeedActivity {
  id: string
  type: 'TASK_CREATED' | 'WORK_SUBMITTED' | 'WORK_APPROVED' | 'TIP_SENT' | 'USER_JOINED'
  user: User
  task?: Task
  amount?: string
  createdAt: string
}

export interface LeaderboardEntry {
  rank: number
  user: User
  taskCount: number
  totalEarned: string
}

export interface ApiError {
  message: string
  code?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}
