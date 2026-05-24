import { Match } from '@/types'
import { sampleUsers } from './users'

export const sampleMatches: Match[] = sampleUsers.slice(0, 4).map((user, index) => ({
  id: `match-${index}`,
  user,
  compatibility: 85 + Math.floor(Math.random() * 15),
  sharedInterests: user.interests.slice(0, 2),
  sharedGoals: user.goals.slice(0, 1),
  matchReasons: [
    'Similar study habits',
    'Compatible lifestyle',
    'Same accommodation preferences'
  ],
  status: 'pending' as const
}))
