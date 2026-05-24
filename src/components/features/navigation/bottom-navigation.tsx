'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Home, Users, MessageCircle, User } from 'lucide-react'

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'community', icon: Users, label: 'Community' },
  { id: 'matches', icon: User, label: 'Matches' },
  { id: 'chat', icon: MessageCircle, label: 'Chat' },
]

export function BottomNavigation() {
  const { currentView, setView, chats } = useAppStore()

  const unreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0)

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-border safe-bottom">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            const showBadge = item.id === 'chat' && unreadCount > 0

            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as any)}
                className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors"
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                  
                  {/* Unread Badge */}
                  {showBadge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-primary flex items-center justify-center"
                    >
                      <span className="text-white text-xs font-bold">
                        {unreadCount}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
