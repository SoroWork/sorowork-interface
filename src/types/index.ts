export interface Task {
  id: string
  title: string
  description: string
  rewardAmount: number
  token: string
  status: TaskStatus
  tags: string[]
  category: string
  location?: TaskLocation
  creatorId: string
  creator?: UserProfile
  communityId?: string
  community?: Community
  submissions?: Submission[]
  createdAt: string
  updatedAt: string
}

export type TaskStatus = 'OPEN' | 'ASSIGNED' | 'SUBMITTED' | 'APPROVED' | 'CANCELLED'

export interface TaskLocation {
  address: string
  lat?: number
  lng?: number
  radius?: number
}

export interface UserProfile {
  id: string
  walletAddress: string
  username: string
  bio?: string
  avatarUrl?: string
  reputation: number
  role: 'ADMIN' | 'CREATOR' | 'CONTRIBUTOR'
  tasksCompleted?: number
  totalEarned?: number
  createdAt: string
}

export interface Submission {
  id: string
  taskId: string
  contributorId: string
  contributor?: UserProfile
  task?: Task
  evidenceUrl: string
  description?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

export interface Community {
  id: string
  name: string
  description?: string
  logoUrl?: string
  memberCount?: number
  taskCount?: number
  totalDistributed?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface ApiError {
  error: string
  message?: string
  statusCode: number
}

export type User = UserProfile

export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  read: boolean
  taskId?: string
  createdAt: string
}

export interface FeedActivity {
  id: string
  type: 'TASK_CREATED' | 'WORK_SUBMITTED' | 'WORK_APPROVED' | 'TIP_SENT' | 'USER_JOINED'
  user: UserProfile
  task?: { id: string; title: string }
  amount?: number
  createdAt: string
}

export interface LeaderboardEntry {
  id: string
  walletAddress: string
  username: string
  avatarUrl?: string
  reputation: number
  tasksCompleted: number
  totalEarned: number
  rank: number
}
