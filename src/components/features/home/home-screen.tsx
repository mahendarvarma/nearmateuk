'use client'

import { AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { StudentDiscoveryFeed } from './student-discovery-feed'
import { MatchCheckExperience } from './match-check-experience'

export function HomeScreen() {
  const { isMatchCheckActive } = useAppStore()

  return (
    <AnimatePresence mode="wait">
      {isMatchCheckActive ? (
        <MatchCheckExperience key="match-check" />
      ) : (
        <StudentDiscoveryFeed key="discovery-feed" />
      )}
    </AnimatePresence>
  )
}
