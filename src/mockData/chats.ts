import { Chat } from '@/types'
import { sampleUsers } from './users'

export const sampleChats: Chat[] = [
  {
    id: 'chat-1',
    user: sampleUsers[0],
    messages: [
      { id: 'm1', senderId: '1', text: 'Hi! I saw your profile and we have so many things in common!', timestamp: '10:30 AM', read: true },
      { id: 'm2', senderId: 'current', text: 'Hey Priya! Yes, I noticed we both love technology and reading!', timestamp: '10:32 AM', read: true },
      { id: 'm3', senderId: '1', text: 'Exactly! Are you also looking for accommodation near campus?', timestamp: '10:35 AM', read: true },
      { id: 'm4', senderId: 'current', text: 'Yes! I prefer somewhere quiet but not too far from the city center.', timestamp: '10:38 AM', read: true },
      { id: 'm5', senderId: '1', text: 'That sounds perfect. Would you like to meet for coffee and discuss potential roommate options?', timestamp: '10:40 AM', read: false },
    ],
    lastMessage: { id: 'm5', senderId: '1', text: 'That sounds perfect. Would you like to meet for coffee and discuss potential roommate options?', timestamp: '10:40 AM', read: false },
    unreadCount: 1
  },
  {
    id: 'chat-2',
    user: sampleUsers[1],
    messages: [
      { id: 'm1', senderId: '2', text: 'Hey! Want to join our study group?', timestamp: 'Yesterday', read: true },
      { id: 'm2', senderId: 'current', text: 'Sure, when do you usually meet?', timestamp: 'Yesterday', read: true },
    ],
    lastMessage: { id: 'm2', senderId: 'current', text: 'Sure, when do you usually meet?', timestamp: 'Yesterday', read: true },
    unreadCount: 0
  },
  {
    id: 'chat-3',
    user: sampleUsers[3],
    messages: [
      { id: 'm1', senderId: '4', text: 'Hi there! Saw you are also into engineering. What field?', timestamp: '2 days ago', read: true },
    ],
    lastMessage: { id: 'm1', senderId: '4', text: 'Hi there! Saw you are also into engineering. What field?', timestamp: '2 days ago', read: true },
    unreadCount: 0
  }
]
