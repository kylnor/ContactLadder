export type ModuleCategory = 'essentials' | 'deep-dive' | 'mini-guide'

export type ModuleStatus = 'not_started' | 'in_progress' | 'completed'

export type SubscriptionTier = 'free' | 'premium' | 'enterprise'

export interface ModuleMetadata {
  title: string
  slug: string
  category: ModuleCategory
  orderIndex: number
  estimatedDuration: number // minutes
  prerequisites: string[] // slugs
  description: string
  videos?: Record<string, string> // { intro: 'youtube:xyz', demo: 'vimeo:abc' }
  published: boolean
}

export interface Module extends ModuleMetadata {
  id: string
  contentPath: string
  createdAt: string
  updatedAt: string
}

export interface ModuleProgress {
  userId: string
  moduleId: string
  status: ModuleStatus
  progressPercent: number // 0-100
  startedAt?: string
  completedAt?: string
  lastAccessedAt: string
  timeSpentSeconds: number
}

export interface VideoProgress {
  userId: string
  moduleId: string
  videoKey: string
  watchedPercent: number // 0-100
  lastPositionSeconds: number
  completed: boolean
}

export interface UserProfile {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
  subscriptionTier: SubscriptionTier
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  userId: string
  gciGoal?: number
  averageSalePrice?: number
  commissionPercent?: number
  magicNumber?: number
  onboardingCompleted: boolean
}

export interface PersonalizationData {
  name?: string
  gciGoal?: string
  averageSalePrice?: string
  commissionPercent?: string
  magicNumber?: string
}
