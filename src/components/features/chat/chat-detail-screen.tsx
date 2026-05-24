'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Phone, Video, Send, MoreVertical, Check, CheckCheck } from 'lucide-react'

export function ChatDetailScreen() {
  const { chats, selectedChatId, addMessage, setSelectedChat, setView } = useAppStore()
  const [messageText, setMessageText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const chat = chats.find(c => c.user.id === selectedChatId)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chat?.messages])

  const handleSendMessage = () => {
    if (!messageText.trim() || !chat) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'current',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    }

    addMessage(chat.id, newMessage)
    setMessageText('')

    // Simulate typing response
    setTimeout(() => setIsTyping(true), 1000)
    setTimeout(() => {
      setIsTyping(false)
      if (chat) {
        addMessage(chat.id, {
          id: `msg-${Date.now()}`,
          senderId: chat.user.id,
          text: "That sounds great! Let's discuss more.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: true,
        })
      }
    }, 3000)
  }

  const handleBack = () => {
    setSelectedChat(null)
    setView('chat')
  }

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Chat not found</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="glass-card border-b border-border px-4 py-3 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-xl">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 flex items-center gap-3">
          <div className="relative">
            <img
              src={chat.user.avatar}
              alt={chat.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {chat.user.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{chat.user.name}</h2>
            <p className="text-xs text-muted-foreground">
              {chat.user.isOnline ? 'Online' : chat.user.lastActive}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" ref={scrollRef}>
        <AnimatePresence>
          {chat.messages.map((message, index) => {
            const isCurrentUser = message.senderId === 'current'
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    isCurrentUser
                      ? 'gradient-primary text-white rounded-br-md'
                      : 'bg-secondary text-secondary-foreground rounded-bl-md'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className={`flex items-center gap-1 mt-1 text-xs ${
                    isCurrentUser ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp}
                    {isCurrentUser && (
                      message.read ? (
                        <CheckCheck className="w-3 h-3" />
                      ) : (
                        <Check className="w-3 h-3" />
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex justify-start"
            >
              <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-muted-foreground"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="glass-card border-t border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 h-12 rounded-xl bg-secondary/50 border-0"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="w-12 h-12 rounded-xl gradient-primary text-white"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
