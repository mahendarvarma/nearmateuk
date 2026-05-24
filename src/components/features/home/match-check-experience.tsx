'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { X, Sparkles, ChevronDown, ChevronUp, RefreshCw, Send, Eye, CheckCircle2, Zap, Target, Heart, MapPin, GraduationCap, Globe } from 'lucide-react'

type MatchPhase = 'intro' | 'analyzing' | 'shuffle' | 'reveal' | 'result'

export function MatchCheckExperience() {
  const { selectedMatchUser, setMatchCheckActive, setSelectedMatchUser, matches } = useAppStore()
  const [phase, setPhase] = useState<MatchPhase>('intro')
  const [compatibilityScore, setCompatibilityScore] = useState(0)
  const [showMatchReasons, setShowMatchReasons] = useState(false)
  const [shuffling, setShuffling] = useState(false)
  const [displayedUser, setDisplayedUser] = useState(selectedMatchUser)

  useEffect(() => {
    if (selectedMatchUser) {
      setDisplayedUser(selectedMatchUser)
    }
  }, [selectedMatchUser])

  const handleClose = () => {
    setMatchCheckActive(false)
    setSelectedMatchUser(null)
    setPhase('intro')
    setCompatibilityScore(0)
    setShowMatchReasons(false)
  }

  const startMatchCheck = () => {
    setPhase('analyzing')
    
    // Simulate AI analysis
    setTimeout(() => {
      setPhase('shuffle')
      setShuffling(true)
      
      // Shuffle animation
      let shuffleCount = 0
      const shuffleInterval = setInterval(() => {
        setDisplayedUser(matches[Math.floor(Math.random() * matches.length)].user)
        shuffleCount++
        if (shuffleCount >= 8) {
          clearInterval(shuffleInterval)
          setShuffling(false)
          setDisplayedUser(selectedMatchUser)
          setPhase('reveal')
          
          // Animate compatibility score
          const targetScore = Math.floor(Math.random() * 30) + 70 // 70-99%
          let currentScore = 0
          const scoreInterval = setInterval(() => {
            currentScore += 2
            if (currentScore >= targetScore) {
              currentScore = targetScore
              clearInterval(scoreInterval)
              setPhase('result')
            }
            setCompatibilityScore(currentScore)
          }, 30)
        }
      }, 150)
    }, 1500)
  }

  const playAgain = () => {
    // Select a different random match
    const pendingMatches = matches.filter(m => m.status === 'pending' && m.user.id !== selectedMatchUser?.id)
    if (pendingMatches.length > 0) {
      const randomMatch = pendingMatches[Math.floor(Math.random() * pendingMatches.length)]
      setSelectedMatchUser(randomMatch.user)
      setPhase('intro')
      setCompatibilityScore(0)
      setShowMatchReasons(false)
    } else {
      handleClose()
    }
  }

  if (!selectedMatchUser) {
    return null
  }

  const matchReasons = [
    `Both interested in ${selectedMatchUser.interests.slice(0, 2).join(' & ')}`,
    selectedMatchUser.university ? 'Same university' : 'Same city',
    'Similar accommodation preferences',
    'Compatible lifestyle habits',
    'Shared goals and aspirations',
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={handleClose}
        className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border hover:bg-background transition-colors"
      >
        <X className="w-5 h-5 text-muted-foreground" />
      </motion.button>

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-1 flex flex-col items-center justify-center px-6 relative z-10"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-6 max-w-md"
            >
              {/* Profile Card */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-3xl p-6 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <motion.img
                    src={selectedMatchUser.avatar}
                    alt={selectedMatchUser.name}
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="flex-1 text-left">
                    <h2 className="text-xl font-bold text-foreground">{selectedMatchUser.nickname}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      {selectedMatchUser.university && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5" />
                          {selectedMatchUser.university}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        {selectedMatchUser.country}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedMatchUser.interests.slice(0, 4).map((interest: string) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold gradient-text">
                  Analyze Compatibility
                </h3>
                <p className="text-muted-foreground">
                  Our AI will analyze your compatibility with {selectedMatchUser.nickname} based on interests, lifestyle, and goals.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={startMatchCheck}
                    className="w-full h-14 rounded-2xl gradient-primary text-white font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Start Compatibility Check
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {phase === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6 relative z-10"
          >
            <motion.div
              className="text-center space-y-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {/* Scanning Animation */}
              <div className="relative">
                <motion.div
                  className="w-32 h-32 rounded-full border-4 border-primary/30"
                  animate={{
                    rotate: 360,
                    borderColor: ['rgba(var(--primary), 0.3)', 'rgba(var(--primary), 0.8)', 'rgba(var(--primary), 0.3)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 w-32 h-32 rounded-full border-4 border-purple-500/30"
                  animate={{
                    rotate: -360,
                    borderColor: ['rgba(168, 85, 247, 0.3)', 'rgba(168, 85, 247, 0.8)', 'rgba(168, 85, 247, 0.3)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <motion.h2
                  className="text-2xl font-bold text-foreground"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Analyzing Compatibility...
                </motion.h2>
                <p className="text-muted-foreground">
                  Processing interests, lifestyle, and goals
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === 'shuffle' && (
          <motion.div
            key="shuffle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6 relative z-10"
          >
            <motion.div
              className="text-center space-y-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              {/* Shuffling Profile Cards */}
              <div className="relative w-64 h-80">
                <AnimatePresence mode="popLayout">
                  {displayedUser && (
                    <motion.div
                      key={displayedUser.id}
                      initial={{ 
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50,
                        rotate: Math.random() * 20 - 10,
                        scale: 0.8,
                        opacity: 0
                      }}
                      animate={{ 
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 1
                      }}
                      exit={{ 
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100,
                        rotate: Math.random() * 40 - 20,
                        scale: 0.8,
                        opacity: 0
                      }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 glass-card rounded-3xl overflow-hidden"
                    >
                      <img
                        src={displayedUser.avatar}
                        alt={displayedUser.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <motion.h2
                  className="text-2xl font-bold text-foreground"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  Finding Best Match...
                </motion.h2>
                <p className="text-muted-foreground">
                  Scanning through potential connections
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6 relative z-10"
          >
            <motion.div
              className="text-center space-y-8 max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {/* Match Found Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-500 blur-2xl opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                  <CheckCircle2 className="w-16 h-16 text-white" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold gradient-text">
                  Match Found!
                </h2>
                <p className="text-muted-foreground">
                  {selectedMatchUser.nickname} is highly compatible with you
                </p>
              </motion.div>

              {/* Animated Compatibility Score */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="glass-card rounded-3xl p-8"
              >
                <div className="relative w-40 h-40 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted-foreground/20"
                    />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: compatibilityScore / 100 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(280, 70%, 50%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-4xl font-bold gradient-text"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      {compatibilityScore}%
                    </motion.span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Compatibility Score
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col px-4 pt-6 pb-28 relative z-10 overflow-y-auto"
          >
            <div className="space-y-6 max-w-lg mx-auto w-full">
              {/* Match Header */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-2"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {compatibilityScore}% Compatible
                  </span>
                </motion.div>
                <h2 className="text-3xl font-bold gradient-text">
                  {selectedMatchUser.nickname}
                </h2>
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                  {selectedMatchUser.university && (
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {selectedMatchUser.university}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    {selectedMatchUser.country}
                  </span>
                </div>
              </motion.div>

              {/* Profile Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-3xl p-5 space-y-4"
              >
                <div className="flex items-start gap-4">
                  <motion.img
                    src={selectedMatchUser.avatar}
                    alt={selectedMatchUser.name}
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedMatchUser.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedMatchUser.interests.map((interest: string) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Compatibility Details */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-3xl p-5 space-y-4"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Compatibility Analysis
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Common Interests</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.random() * 30 + 70}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {Math.floor(Math.random() * 30 + 70)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Lifestyle Match</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.random() * 30 + 70}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {Math.floor(Math.random() * 30 + 70)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Goals Alignment</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.random() * 30 + 70}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {Math.floor(Math.random() * 30 + 70)}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Why You Matched */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-3xl p-5 space-y-3"
              >
                <button
                  onClick={() => setShowMatchReasons(!showMatchReasons)}
                  className="flex items-center justify-between w-full"
                >
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Why You Matched
                  </h3>
                  {showMatchReasons ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                <AnimatePresence>
                  {showMatchReasons && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2 pt-2"
                    >
                      {matchReasons.map((reason, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{reason}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full h-14 rounded-2xl gradient-primary text-white font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Connection Request
                  </Button>
                </motion.div>

                <div className="flex gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-xl border-2 border-border hover:border-primary/50"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Profile
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button
                      variant="outline"
                      onClick={playAgain}
                      className="w-full h-12 rounded-xl border-2 border-border hover:border-primary/50"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Play Again
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
