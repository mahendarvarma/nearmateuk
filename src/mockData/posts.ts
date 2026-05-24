import { Post } from '@/types'
import { sampleUsers } from './users'

export const samplePosts: Post[] = [
  {
    id: '1',
    author: sampleUsers[0],
    content: 'Looking for a roommate near University of Manchester! I prefer someone who is tidy and respects quiet hours. Budget around £600-700/month. DM if interested!',
    type: 'roommate',
    timestamp: '2 hours ago',
    likes: 12,
    comments: [
      {
        id: 'c1',
        author: sampleUsers[1],
        content: 'Hi! I might be interested. What area are you looking at?',
        timestamp: '1 hour ago',
        likes: 2
      }
    ],
    isLiked: false
  },
  {
    id: '2',
    author: sampleUsers[2],
    content: 'Any tips for finding affordable accommodation in Leeds? The prices seem quite high compared to what I expected. Any suggestions would be appreciated!',
    type: 'help',
    timestamp: '5 hours ago',
    likes: 24,
    comments: [],
    isLiked: true
  },
  {
    id: '3',
    author: sampleUsers[3],
    content: 'Just found out about a great study group forming at the library every Thursday! Anyone interested in joining? All subjects welcome.',
    type: 'discussion',
    timestamp: '1 day ago',
    likes: 45,
    comments: [
      {
        id: 'c2',
        author: sampleUsers[4],
        content: 'This sounds amazing! Count me in.',
        timestamp: '20 hours ago',
        likes: 5
      }
    ],
    isLiked: false
  },
  {
    id: '4',
    author: sampleUsers[1],
    content: 'Room available in a 3-bed flat in Birmingham city center. £650/month including bills. Available from October. Modern building with gym access!',
    type: 'accommodation',
    timestamp: '2 days ago',
    likes: 67,
    comments: [],
    isLiked: false
  }
]
