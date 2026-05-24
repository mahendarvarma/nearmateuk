'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { MapPin, GraduationCap, Globe, Sparkles, User as UserIcon, ChevronRight, Eye, Zap } from 'lucide-react'
import type { User as UserType } from '@/types'
import { LocationPrivacySettings } from '../location/location-privacy-settings'

interface StudentCardProps {
  user: UserType
  compatibility: number
  distance?: string
  onViewProfile: () => void
  onMatchCheck: () => void
}

function StudentCard({ user, compatibility, distance, onViewProfile, onMatchCheck }: StudentCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass-card rounded-3xl p-5 space-y-4 relative overflow-hidden"
    >
      {/* Floating Glow Effect */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Header */}
      <div className="flex items-start gap-4 relative z-10">
        <div className="relative">
          <motion.img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
          {user.isOnline && (
            <motion.div
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-foreground mb-1">{user.nickname}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            {user.university && (
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                {user.university}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              {user.country}
            </span>
          </div>
          
          {/* Compatibility Badge */}
          <div className="flex items-center gap-2">
            <motion.div
              className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-semibold text-primary flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {compatibility}% Compatible
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed relative z-10">
        {user.bio}
      </p>

      {/* Interests */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {user.interests.slice(0, 4).map((interest) => (
          <motion.span
            key={interest}
            className="px-3 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-semibold border border-border/50"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--primary), 0.1)' }}
          >
            {interest}
          </motion.span>
        ))}
        {user.interests.length > 4 && (
          <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
            +{user.interests.length - 4}
          </span>
        )}
      </div>

      {/* Accommodation Preference */}
      {user.accommodationNeeds && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground relative z-10">
          <MapPin className="w-3.5 h-3.5" />
          <span>{user.accommodationNeeds.location} • {user.accommodationNeeds.roomType}</span>
          {distance && (
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
              {distance}
            </span>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2 relative z-10">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Button
            variant="outline"
            onClick={onViewProfile}
            className="w-full h-11 rounded-xl border-2 border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Profile
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Button
            onClick={onMatchCheck}
            className="w-full h-11 rounded-xl gradient-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40"
          >
            <Zap className="w-4 h-4 mr-2" />
            Match Check
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function StudentDiscoveryFeed() {
  const { matches, setMatchCheckActive, setSelectedMatchUser, setView, locationPermission } = useAppStore()

  const handleViewProfile = (user: UserType) => {
    // Navigate to profile view (to be implemented)
    console.log('View profile:', user.id)
  }

  const handleMatchCheck = (user: UserType) => {
    setSelectedMatchUser(user)
    setMatchCheckActive(true)
  }

  const pendingMatches = matches.filter(m => m.status === 'pending')

  // Generate random distances for demo purposes
  const getDistance = (index: number): string | undefined => {
    const distances = ['0.5 km', '1.2 km', '2.3 km', '3.1 km', '4.5 km', '5.8 km']
    return locationPermission === 'granted' ? distances[index % distances.length] : undefined
  }

  return (
    <div className="flex-1 flex flex-col px-4 pt-4 pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text mb-1">Discover</h1>
          <p className="text-sm text-muted-foreground">
            {pendingMatches.length} potential connections
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LocationPrivacySettings />
          <motion.div
            whileHover={{ scale: 1.05, rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-primary" />
          </motion.div>
        </div>
      </motion.div>

      {/* Student Cards */}
      <div className="flex-1 space-y-4 overflow-y-auto pb-4">
        <AnimatePresence mode="popLayout">
          {pendingMatches.map((match, index) => (
            <StudentCard
              key={match.id}
              user={match.user}
              compatibility={match.compatibility}
              distance={getDistance(index)}
              onViewProfile={() => handleViewProfile(match.user)}
              onMatchCheck={() => handleMatchCheck(match.user)}
            />
          ))}
        </AnimatePresence>

        {pendingMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <UserIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No more profiles to discover
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Check back later for new potential connections or explore the community
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
