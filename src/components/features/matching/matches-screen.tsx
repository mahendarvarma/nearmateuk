'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { MessageCircle, MapPin, GraduationCap, Heart, Check } from 'lucide-react'

export function MatchesScreen() {
  const { matches, setSelectedChat, setView } = useAppStore()
  const connectedMatches = matches.filter(m => m.status === 'connected')

  const handleChat = (userId: string) => {
    setSelectedChat(userId)
    setView('chat-detail')
  }

  return (
    <div className="flex-1 flex flex-col px-4 pt-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold gradient-text">My Matches</h1>
        <span className="text-sm text-muted-foreground">
          {connectedMatches.length} connected
        </span>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {connectedMatches.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No matches yet
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Start swiping to find compatible people and build connections
            </p>
          </div>
        ) : (
          connectedMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-4 space-y-4"
            >
              {/* User Info */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={match.user.avatar}
                    alt={match.user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-card flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">
                    {match.user.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <GraduationCap className="w-4 h-4" />
                    <span className="truncate">{match.user.university}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{match.user.country}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {match.compatibility}%
                  </div>
                  <div className="text-xs text-muted-foreground">match</div>
                </div>
              </div>

              {/* Shared Interests */}
              <div className="flex flex-wrap gap-2">
                {match.sharedInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <Button
                onClick={() => handleChat(match.user.id)}
                className="w-full h-12 gradient-primary text-white rounded-xl font-medium"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chat
              </Button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
