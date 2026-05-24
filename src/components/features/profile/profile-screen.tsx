'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { 
  MapPin, GraduationCap, Globe, Heart, Target, 
  Moon, Sun, Users, Book, Home, Settings, LogOut,
  Edit, Calendar, Award 
} from 'lucide-react'

export function ProfileScreen() {
  const { currentUser, setView, setAuthenticated } = useAppStore()

  const handleLogout = () => {
    setAuthenticated(false)
    setView('splash')
  }

  if (!currentUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      {/* Header with Gradient */}
      <div className="relative h-48 gradient-primary">
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="rounded-xl bg-white/20 backdrop-blur-sm text-white">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="relative px-4 -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Avatar */}
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-32 h-32 rounded-full border-4 border-background object-cover shadow-xl"
            />
            <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Name and Info */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">{currentUser.name}</h1>
            <p className="text-muted-foreground">@{currentUser.nickname}</p>
          </div>

          {/* Stats */}
          <div className="flex gap-6 py-4 border-y border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">85%</div>
              <div className="text-xs text-muted-foreground">Match Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-xs text-muted-foreground">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">5</div>
              <div className="text-xs text-muted-foreground">Posts</div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <h2 className="font-semibold text-foreground">About</h2>
            <p className="text-muted-foreground leading-relaxed">{currentUser.bio}</p>
          </div>

          {/* Basic Info */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Basic Info</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <GraduationCap className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{currentUser.university}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{currentUser.country}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">Joined September 2024</span>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {currentUser.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Goals</h2>
            <div className="space-y-2">
              {currentUser.goals.map((goal, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="text-foreground">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lifestyle */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Lifestyle</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card rounded-xl p-3 space-y-1">
                <Moon className="w-4 h-4 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">Sleep</div>
                <div className="text-sm font-medium text-foreground">{currentUser.lifestyle.sleepSchedule}</div>
              </div>
              <div className="glass-card rounded-xl p-3 space-y-1">
                <Sun className="w-4 h-4 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">Cleanliness</div>
                <div className="text-sm font-medium text-foreground">{currentUser.lifestyle.cleanliness}</div>
              </div>
              <div className="glass-card rounded-xl p-3 space-y-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">Social</div>
                <div className="text-sm font-medium text-foreground">{currentUser.lifestyle.socialLevel}</div>
              </div>
              <div className="glass-card rounded-xl p-3 space-y-1">
                <Book className="w-4 h-4 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">Study</div>
                <div className="text-sm font-medium text-foreground">{currentUser.lifestyle.studyHabits}</div>
              </div>
            </div>
          </div>

          {/* Accommodation */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Accommodation Preferences</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Home className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{currentUser.accommodationNeeds.budget} budget</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{currentUser.accommodationNeeds.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">Move in: {currentUser.accommodationNeeds.moveInDate}</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full h-12 rounded-xl text-destructive border-destructive/50 hover:border-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
