'use client'

import { AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import {
  SplashScreen,
  OnboardingScreen,
  AuthScreen,
  ProfileSetupScreen,
  HomeScreen,
  MatchesScreen,
  ChatListScreen,
  ChatDetailScreen,
  CommunityScreen,
  ProfileScreen,
  BottomNavigation
} from '@/components/features'

export function NearMateApp() {
  const { currentView } = useAppStore()

  // Views that show the bottom navigation
  const showBottomNav = ['home', 'community', 'matches', 'chat', 'profile'].includes(currentView)

  const renderView = () => {
    switch (currentView) {
      case 'splash':
        return <SplashScreen key="splash" />
      case 'onboarding':
        return <OnboardingScreen key="onboarding" />
      case 'login':
      case 'register':
        return <AuthScreen key="auth" />
      case 'profile-setup':
        return <ProfileSetupScreen key="profile-setup" />
      case 'home':
        return <HomeScreen key="home" />
      case 'community':
        return <CommunityScreen key="community" />
      case 'matches':
        return <MatchesScreen key="matches" />
      case 'chat':
        return <ChatListScreen key="chat" />
      case 'chat-detail':
        return <ChatDetailScreen key="chat-detail" />
      case 'profile':
        return <ProfileScreen key="profile" />
      default:
        return <HomeScreen key="home" />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Background gradient decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && currentView !== 'chat-detail' && (
        <div className="relative z-20">
          <BottomNavigation />
        </div>
      )}
    </div>
  )
}
