'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Shield, Eye, MapPin, Users, Lock, ChevronRight, X } from 'lucide-react'

export function LocationPrivacySettings() {
  const { locationPrivacyMode, setLocationPrivacyMode } = useAppStore()
  const [isOpen, setIsOpen] = useState(false)

  const privacyOptions = [
    {
      value: 'visible' as const,
      label: 'Visible',
      description: 'Show approximate area to all users',
      icon: Eye,
    },
    {
      value: 'approximate' as const,
      label: 'Approximate',
      description: 'Show only distance radius',
      icon: MapPin,
    },
    {
      value: 'matches-only' as const,
      label: 'Matches Only',
      description: 'Visible only to connected users',
      icon: Users,
    },
    {
      value: 'invisible' as const,
      label: 'Invisible',
      description: 'Hide location completely',
      icon: Lock,
    },
  ]

  const selectedOption = privacyOptions.find(opt => opt.value === locationPrivacyMode)

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors"
      >
        <Shield className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">
          {selectedOption?.label || 'Privacy'}
        </span>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="glass-card rounded-3xl p-6 max-w-sm w-full space-y-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Location Privacy</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-background/80 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {privacyOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = locationPrivacyMode === option.value

                  return (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setLocationPrivacyMode(option.value)
                        setIsOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'bg-secondary/30 border-2 border-transparent hover:bg-secondary/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-primary/20' : 'bg-background/50'
                      }`}>
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`text-sm font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {option.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Note */}
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-xs text-muted-foreground text-center">
                  Your exact location is never shared publicly
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
