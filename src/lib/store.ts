import { create } from 'zustand'
import type { AppView, User, Match, Message, Chat, Post, UserType } from '@/types'
import { sampleMatches, sampleChats, samplePosts } from '@/mockData'

interface AppState {
  currentView: AppView
  isAuthenticated: boolean
  currentUser: User | null
  userType: UserType | null
  matches: Match[]
  chats: Chat[]
  posts: Post[]
  selectedChatId: string | null
  profileSetupStep: number
  onboardingStep: number
  isMatchCheckActive: boolean
  selectedMatchUser: User | null
  
  // Actions
  setView: (view: AppView) => void
  setAuthenticated: (auth: boolean) => void
  setCurrentUser: (user: User | null) => void
  setUserType: (type: UserType | null) => void
  setMatches: (matches: Match[]) => void
  setChats: (chats: Chat[]) => void
  setPosts: (posts: Post[]) => void
  setSelectedChat: (chatId: string | null) => void
  setProfileSetupStep: (step: number) => void
  setOnboardingStep: (step: number) => void
  setMatchCheckActive: (active: boolean) => void
  setSelectedMatchUser: (user: User | null) => void
  addMessage: (chatId: string, message: Message) => void
  togglePostLike: (postId: string) => void
  connectMatch: (matchId: string) => void
  skipMatch: (matchId: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'splash',
  isAuthenticated: false,
  currentUser: null,
  userType: null,
  matches: sampleMatches,
  chats: sampleChats,
  posts: samplePosts,
  selectedChatId: null,
  profileSetupStep: 0,
  onboardingStep: 0,
  isMatchCheckActive: false,
  selectedMatchUser: null,
  
  setView: (view) => set({ currentView: view }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setUserType: (type) => set({ userType: type }),
  setMatches: (matches) => set({ matches }),
  setChats: (chats) => set({ chats }),
  setPosts: (posts) => set({ posts }),
  setSelectedChat: (chatId) => set({ selectedChatId: chatId }),
  setProfileSetupStep: (step) => set({ profileSetupStep: step }),
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  setMatchCheckActive: (active) => set({ isMatchCheckActive: active }),
  setSelectedMatchUser: (user) => set({ selectedMatchUser: user }),
  
  addMessage: (chatId, message) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.id === chatId
        ? { ...chat, messages: [...chat.messages, message], lastMessage: message }
        : chat
    )
  })),
  
  togglePostLike: (postId) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    )
  })),
  
  connectMatch: (matchId) => set((state) => ({
    matches: state.matches.map((match) =>
      match.id === matchId ? { ...match, status: 'connected' as const } : match
    )
  })),
  
  skipMatch: (matchId) => set((state) => ({
    matches: state.matches.map((match) =>
      match.id === matchId ? { ...match, status: 'skipped' as const } : match
    )
  }))
}))
