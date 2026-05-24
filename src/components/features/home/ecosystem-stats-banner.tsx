'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Users, Activity, MapPin, Zap } from 'lucide-react'

export function EcosystemStatsBanner() {
  const { nearbyActiveCount, totalActiveCount, totalRegisteredCount } = useAppStore()
  const [animatedNearby, setAnimatedNearby] = useState(0)
  const [animatedActive, setAnimatedActive] = useState(0)
  const [animatedTotal, setAnimatedTotal] = useState(0)

  useEffect(() => {
    // Animate counters on mount
    const duration = 1500
    const steps = 30
    const interval = duration / steps

    let step = 0
    const animate = () => {
      if (step < steps) {
        const progress = step / steps
        setAnimatedNearby(Math.floor(nearbyActiveCount * progress))
        setAnimatedActive(Math.floor(totalActiveCount * progress))
        setAnimatedTotal(Math.floor(totalRegisteredCount * progress))
        step++
        setTimeout(animate, interval)
      } else {
        setAnimatedNearby(nearbyActiveCount)
        setAnimatedActive(totalActiveCount)
        setAnimatedTotal(totalRegisteredCount)
      }
    }
    animate()
  }, [nearbyActiveCount, totalActiveCount, totalRegisteredCount])

  const stats = [
    {
      label: 'Students Connected',
      value: animatedTotal.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Active Now',
      value: animatedActive,
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Nearby',
      value: animatedNearby,
      icon: MapPin,
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-4 mb-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Zap className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-sm font-semibold text-foreground">Live Ecosystem</span>
        </div>
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-1.5"
        >
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-muted-foreground">Live</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                <motion.span
                  className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.span>
              </div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
