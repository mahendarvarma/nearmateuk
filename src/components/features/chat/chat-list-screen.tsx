'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MoreVertical, MessageCircle } from 'lucide-react'

export function ChatListScreen() {
  const { chats, setSelectedChat, setView } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredChats = chats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage?.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleChatClick = (userId: string) => {
    setSelectedChat(userId)
    setView('chat-detail')
  }

  return (
    <div className="flex-1 flex flex-col px-4 pt-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold gradient-text">Messages</h1>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 rounded-xl bg-secondary/50 border-0"
        />
      </div>

      {/* Chat List */}
      <div className="space-y-2 flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <MessageCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No messages yet
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Start connecting with people to begin chatting
            </p>
          </div>
        ) : (
          filteredChats.map((chat, index) => (
            <motion.button
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleChatClick(chat.user.id)}
              className="w-full glass-card rounded-2xl p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors text-left"
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={chat.user.avatar}
                  alt={chat.user.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                {chat.user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground truncate">
                    {chat.user.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {chat.lastMessage?.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage?.text || 'No messages yet'}
                </p>
              </div>

              {/* Unread Badge */}
              {chat.unreadCount > 0 && (
                <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {chat.unreadCount}
                  </span>
                </div>
              )}
            </motion.button>
          ))
        )}
      </div>
    </div>
  )
}
