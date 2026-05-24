'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { ChevronRight, Users, Home, MessageCircle, Globe, GraduationCap, HeartHandshake } from 'lucide-react'
import { USER_TYPE_OPTIONS } from '@/lib/constants'
import type { UserType } from '@/types'

const slides = [
  {
    icon: Users,
    title: 'Smart Matching',
    description: 'Find compatible people based on interests, lifestyle, and goals. Our intelligent algorithm connects students and citizens.',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Home,
    title: 'Find Roommates',
    description: 'Discover trusted roommates and accommodation options. Citizens can offer housing to international students.',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    icon: MessageCircle,
    title: 'Build Connections',
    description: 'Join discussions, share experiences, and grow your network with students and citizens across the UK.',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Globe,
    title: 'Inclusive Community',
    description: 'Be part of a trusted ecosystem connecting students and citizens who want to help international students settle in.',
    color: 'from-pink-500 to-rose-600'
  }
]

export function OnboardingScreen() {
  const { onboardingStep, setOnboardingStep, setView, setUserType } = useAppStore()
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null)

  const handleNext = () => {
    if (onboardingStep < slides.length - 1) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      setView('login')
    }
  }

  const handleSkip = () => {
    setView('login')
  }

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type)
    setUserType(type)
    setOnboardingStep(onboardingStep + 1)
  }

  const currentSlide = slides[onboardingStep]
  const Icon = currentSlide.icon

  return (
    <motion.div
      className="fixed inset-0 bg-background flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
        {onboardingStep === 0 ? (
          // User Type Selection Screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center max-w-md w-full space-y-6"
          >
            <motion.h2
              className="text-3xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Who are you?
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Select your profile type to personalize your experience
            </motion.p>
            <div className="w-full space-y-4 mt-8">
              {USER_TYPE_OPTIONS.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleUserTypeSelect(option.id as UserType)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all ${
                    selectedUserType === option.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 bg-card'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      option.id === 'student' ? 'bg-blue-500/10' : 'bg-green-500/10'
                    }`}>
                      {option.id === 'student' ? (
                        <GraduationCap className="w-6 h-6 text-blue-500" />
                      ) : (
                        <HeartHandshake className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-foreground text-lg mb-1">
                        {option.label}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          // Regular Onboarding Slides
          <motion.div
            key={onboardingStep}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center max-w-md"
          >
            {/* Icon Container */}
            <motion.div
              className={`w-32 h-32 rounded-[2rem] bg-gradient-to-br ${currentSlide.color} flex items-center justify-center mb-8 shadow-xl`}
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className={`absolute w-64 h-64 rounded-full bg-gradient-to-br ${currentSlide.color} opacity-10 blur-3xl`}
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ top: '20%', left: '10%' }}
              />
              <motion.div
                className={`absolute w-48 h-48 rounded-full bg-gradient-to-br ${currentSlide.color} opacity-10 blur-3xl`}
                animate={{
                  x: [0, -20, 0],
                  y: [0, 30, 0],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ bottom: '30%', right: '10%' }}
              />
            </div>

            {/* Title */}
            <motion.h2
              className="text-3xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {currentSlide.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-muted-foreground text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentSlide.description}
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Bottom Section */}
      {onboardingStep > 0 && (
        <div className="px-6 pb-12 space-y-6">
          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setOnboardingStep(index + 1)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index + 1 === onboardingStep
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={handleNext}
              className="w-full h-14 text-lg font-semibold gradient-primary text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {onboardingStep === slides.length ? 'Get Started' : 'Continue'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          {/* Login Link */}
          <p className="text-center text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={() => setView('login')}
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      )}
    </motion.div>
  )
}
