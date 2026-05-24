'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  ArrowLeft, ArrowRight, Camera, Check, MapPin, GraduationCap, 
  Globe, Heart, Target, Moon, Sun, Users, Book, Home, Loader2 
} from 'lucide-react'
import { 
  INTEREST_OPTIONS, GOAL_OPTIONS, SLEEP_SCHEDULE_OPTIONS, 
  CLEANLINESS_OPTIONS, SOCIAL_LEVEL_OPTIONS, STUDY_HABITS_OPTIONS,
  BUDGET_OPTIONS, LOCATION_OPTIONS, ROOM_TYPE_OPTIONS,
  CITIZEN_EXPERTISE_OPTIONS, LANGUAGE_OPTIONS 
} from '@/lib/constants'

const steps = [
  { id: 'photo', title: 'Profile Photo', subtitle: 'Add a photo so others can recognize you' },
  { id: 'basics', title: 'Basic Info', subtitle: 'Tell us about yourself' },
  { id: 'interests', title: 'Your Interests', subtitle: 'Select topics you enjoy' },
  { id: 'lifestyle', title: 'Lifestyle', subtitle: 'Help us find compatible matches' },
  { id: 'accommodation', title: 'Accommodation', subtitle: 'Your housing preferences' },
  { id: 'citizen', title: 'Citizen Profile', subtitle: 'How can you help students?' },
]

export function ProfileSetupScreen() {
  const { profileSetupStep, setProfileSetupStep, setView, setAuthenticated, setCurrentUser, userType } = useAppStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<{
    nickname: string
    university: string
    country: string
    bio: string
    interests: string[]
    skills: string[]
    goals: string[]
    sleepSchedule: string
    cleanliness: string
    socialLevel: string
    studyHabits: string
    budget: string
    location: string
    moveInDate: string
    roomType: string
    canOfferAccommodation: boolean
    canOfferMentorship: boolean
    canOfferLanguageHelp: boolean
    languagesSpoken: string[]
    areasOfExpertise: string[]
  }>({
    nickname: '',
    university: '',
    country: '',
    bio: '',
    interests: [],
    skills: [],
    goals: [],
    sleepSchedule: '',
    cleanliness: '',
    socialLevel: '',
    studyHabits: '',
    budget: '',
    location: '',
    moveInDate: '',
    roomType: '',
    canOfferAccommodation: false,
    canOfferMentorship: false,
    canOfferLanguageHelp: false,
    languagesSpoken: [],
    areasOfExpertise: [],
  })

  const currentStep = steps[profileSetupStep]
  
  // Skip citizen step if user is not a citizen
  const effectiveStep = userType === 'citizen' ? profileSetupStep : profileSetupStep >= 4 ? profileSetupStep + 1 : profileSetupStep
  const adjustedSteps = userType === 'citizen' ? steps : steps.filter(s => s.id !== 'citizen')

  const toggleSelection = (field: 'interests' | 'skills' | 'goals' | 'languagesSpoken' | 'areasOfExpertise', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }))
  }

  const handleNext = async () => {
    if (profileSetupStep < steps.length - 1) {
      setProfileSetupStep(profileSetupStep + 1)
    } else {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setCurrentUser({
        id: 'current',
        name: formData.nickname,
        nickname: formData.nickname,
        email: 'user@example.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
        userType: userType || 'student',
        university: formData.university,
        country: formData.country,
        bio: formData.bio,
        interests: formData.interests,
        skills: formData.skills,
        goals: formData.goals,
        lifestyle: {
          sleepSchedule: formData.sleepSchedule,
          cleanliness: formData.cleanliness,
          socialLevel: formData.socialLevel,
          studyHabits: formData.studyHabits,
        },
        accommodationNeeds: {
          budget: formData.budget,
          location: formData.location,
          moveInDate: formData.moveInDate,
          roomType: formData.roomType,
        },
        isOnline: true,
        lastActive: 'Now',
      })
      
      setAuthenticated(true)
      setIsLoading(false)
      setView('home')
    }
  }

  const handleBack = () => {
    if (profileSetupStep > 0) {
      setProfileSetupStep(profileSetupStep - 1)
    } else {
      setView('register')
    }
  }

  const renderStepContent = () => {
    switch (currentStep.id) {
      case 'photo':
        return (
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="w-40 h-40 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                <Camera className="w-16 h-16 text-muted-foreground" />
              </div>
              <button className="absolute bottom-2 right-2 w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white shadow-lg">
                <Camera className="w-5 h-5" />
              </button>
            </motion.div>
            <p className="text-muted-foreground text-center max-w-xs">
              Upload a clear photo of yourself. This helps build trust in the community.
            </p>
          </div>
        )

      case 'basics':
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                placeholder="What should we call you?"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="h-14 rounded-xl bg-secondary/50 border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="university"
                  placeholder="Your university"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="pl-12 h-14 rounded-xl bg-secondary/50 border-0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Home Country</Label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="country"
                  placeholder="Where are you from?"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="pl-12 h-14 rounded-xl bg-secondary/50 border-0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Short Bio</Label>
              <textarea
                id="bio"
                placeholder="Tell others about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full h-24 px-4 py-3 rounded-xl bg-secondary/50 border-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        )

      case 'interests':
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-medium">Interests</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((interest) => (
                  <motion.button
                    key={interest}
                    type="button"
                    onClick={() => toggleSelection('interests', interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.interests.includes(interest)
                        ? 'gradient-primary text-white shadow-md'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {interest}
                    {formData.interests.includes(interest) && (
                      <Check className="w-4 h-4 ml-1 inline" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                <span className="font-medium">Goals</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {GOAL_OPTIONS.map((goal) => (
                  <motion.button
                    key={goal}
                    type="button"
                    onClick={() => toggleSelection('goals', goal)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.goals.includes(goal)
                        ? 'bg-accent text-accent-foreground shadow-md'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {goal}
                    {formData.goals.includes(goal) && (
                      <Check className="w-4 h-4 ml-1 inline" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )

      case 'lifestyle':
        return (
          <div className="space-y-5">
            <LifestyleOption
              icon={<Moon className="w-5 h-5" />}
              label="Sleep Schedule"
              options={SLEEP_SCHEDULE_OPTIONS}
              value={formData.sleepSchedule}
              onChange={(v) => setFormData({ ...formData, sleepSchedule: v })}
            />
            <LifestyleOption
              icon={<Sun className="w-5 h-5" />}
              label="Cleanliness"
              options={CLEANLINESS_OPTIONS}
              value={formData.cleanliness}
              onChange={(v) => setFormData({ ...formData, cleanliness: v })}
            />
            <LifestyleOption
              icon={<Users className="w-5 h-5" />}
              label="Social Level"
              options={SOCIAL_LEVEL_OPTIONS}
              value={formData.socialLevel}
              onChange={(v) => setFormData({ ...formData, socialLevel: v })}
            />
            <LifestyleOption
              icon={<Book className="w-5 h-5" />}
              label="Study Habits"
              options={STUDY_HABITS_OPTIONS}
              value={formData.studyHabits}
              onChange={(v) => setFormData({ ...formData, studyHabits: v })}
            />
          </div>
        )

      case 'accommodation':
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Monthly Budget</Label>
              <div className="grid grid-cols-2 gap-3">
                {BUDGET_OPTIONS.map((budget) => (
                  <motion.button
                    key={budget}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget })}
                    className={`p-4 rounded-xl text-sm font-medium transition-all ${
                      formData.budget === budget
                        ? 'gradient-primary text-white shadow-md'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    {budget}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Preferred Location</Label>
              <div className="grid grid-cols-2 gap-3">
                {LOCATION_OPTIONS.map((loc) => (
                  <motion.button
                    key={loc}
                    type="button"
                    onClick={() => setFormData({ ...formData, location: loc })}
                    className={`p-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      formData.location === loc
                        ? 'gradient-primary text-white shadow-md'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    <MapPin className="w-4 h-4" />
                    {loc}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Room Type</Label>
              <div className="grid grid-cols-2 gap-3">
                {ROOM_TYPE_OPTIONS.map((type) => (
                  <motion.button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, roomType: type })}
                    className={`p-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      formData.roomType === type
                        ? 'gradient-primary text-white shadow-md'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Home className="w-4 h-4" />
                    {type}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-background flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {profileSetupStep + 1} of {steps.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((profileSetupStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {currentStep.title}
              </h1>
              <p className="text-muted-foreground">{currentStep.subtitle}</p>
            </div>

            {/* Step Content */}
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 pt-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          onClick={handleNext}
          disabled={isLoading}
          className="w-full h-14 text-lg font-semibold gradient-primary text-white rounded-xl shadow-lg"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : profileSetupStep === steps.length - 1 ? (
            'Complete Setup'
          ) : (
            <>
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}

function LifestyleOption({
  icon,
  label,
  options,
  value,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-foreground">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <motion.button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              value === option
                ? 'gradient-primary text-white shadow-md'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
