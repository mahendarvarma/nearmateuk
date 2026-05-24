'use client'

import { AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { StudentDiscoveryFeed } from './student-discovery-feed'
import { MatchCheckExperience } from './match-check-experience'
import { EcosystemStatsBanner } from './ecosystem-stats-banner'
import { LiveStudentMap } from './live-student-map'
import { LocationPermissionModal } from '../location/location-permission-modal'

export function HomeScreen() {
  const { isMatchCheckActive } = useAppStore()

  return (
    <>
      <LocationPermissionModal />
      <AnimatePresence mode="wait">
        {isMatchCheckActive ? (
          <MatchCheckExperience key="match-check" />
        ) : (
          <div key="discovery-feed" className="flex flex-col h-full">
            <EcosystemStatsBanner />
            <LiveStudentMap />
            <StudentDiscoveryFeed />
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
