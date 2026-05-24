'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { MapPin, X, ChevronDown, ChevronUp, Zap, GraduationCap, Globe } from 'lucide-react'
import type { User } from '@/types'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('./leaflet-map'), { ssr: false })

interface MapMarkerData {
  user: User
  lat: number
  lng: number
  compatibility: number
}

export function LiveStudentMap() {
  const { matches, setMatchCheckActive, setSelectedMatchUser, userLocation } = useAppStore()
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerData | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.5074, -0.1278]) // Default: London
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Get user's actual location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setMapCenter([latitude, longitude])
        },
        (error) => {
          console.log('Geolocation error:', error)
          // Keep default London coordinates
        }
      )
    }
  }, [])

  // Generate realistic map positions around the center
  const markers: MapMarkerData[] = matches
    .filter(m => m.status === 'pending')
    .slice(0, 6)
    .map((match, index) => {
      // Generate random positions within 5km of center
      const latOffset = (Math.random() - 0.5) * 0.1
      const lngOffset = (Math.random() - 0.5) * 0.1
      return {
        user: match.user,
        lat: mapCenter[0] + latOffset,
        lng: mapCenter[1] + lngOffset,
        compatibility: match.compatibility,
      }
    })

  const handleMarkerClick = (marker: MapMarkerData) => {
    setSelectedMarker(marker)
  }

  const handleMatchCheck = () => {
    if (selectedMarker) {
      setSelectedMatchUser(selectedMarker.user)
      setMatchCheckActive(true)
      setSelectedMarker(null)
    }
  }

  const handleClosePreview = () => {
    setSelectedMarker(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <MapPin className="w-5 h-5 text-primary" />
          </motion.div>
          <span className="font-semibold text-foreground">Live Student Map</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 350, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {isClient && (
              <LeafletMap
                center={mapCenter}
                markers={markers}
                onMarkerClick={handleMarkerClick}
              />
            )}

            {/* Profile Preview Overlay */}
            <AnimatePresence>
              {selectedMarker && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 right-4 glass-card rounded-2xl p-4 z-[1000]"
                >
                  <button
                    onClick={handleClosePreview}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background/50 flex items-center justify-center hover:bg-background/80 transition-colors"
                  >
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>

                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={selectedMarker.user.avatar}
                      alt={selectedMarker.user.nickname}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{selectedMarker.user.nickname}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {selectedMarker.user.university && (
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            {selectedMarker.user.university}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {selectedMarker.user.country}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold gradient-text">{selectedMarker.compatibility}%</div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleMatchCheck}
                      className="flex-1 h-10 rounded-xl gradient-primary text-white font-semibold text-sm flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Match Check
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
