export type AppView = 
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'register'
  | 'profile-setup'
  | 'home'
  | 'community'
  | 'matches'
  | 'chat'
  | 'chat-detail'
  | 'profile'

export type UserType = 'student' | 'citizen'

export interface User {
  id: string
  name: string
  nickname: string
  email: string
  avatar: string
  userType: UserType
  university?: string
  country: string
  bio: string
  interests: string[]
  skills: string[]
  goals: string[]
  lifestyle: {
    sleepSchedule: string
    cleanliness: string
    socialLevel: string
    studyHabits: string
  }
  accommodationNeeds: {
    budget: string
    location: string
    moveInDate: string
    roomType: string
  }
  citizenProfile?: {
    canOfferAccommodation: boolean
    canOfferMentorship: boolean
    canOfferLanguageHelp: boolean
    languagesSpoken: string[]
    areasOfExpertise: string[]
  }
  isOnline: boolean
  lastActive: string
}

export interface Match {
  id: string
  user: User
  compatibility: number
  sharedInterests: string[]
  sharedGoals: string[]
  matchReasons: string[]
  status: 'pending' | 'connected' | 'skipped'
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  read: boolean
}

export interface Chat {
  id: string
  user: User
  messages: Message[]
  lastMessage: Message | null
  unreadCount: number
}

export interface Post {
  id: string
  author: User
  content: string
  type: 'discussion' | 'accommodation' | 'help' | 'roommate'
  timestamp: string
  likes: number
  comments: Comment[]
  isLiked: boolean
}

export interface Comment {
  id: string
  author: User
  content: string
  timestamp: string
  likes: number
}
