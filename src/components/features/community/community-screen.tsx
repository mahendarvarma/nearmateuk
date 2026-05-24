'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, Filter, Plus, Heart, MessageCircle, Share2, 
  MoreVertical, MapPin, Clock 
} from 'lucide-react'
import { POST_TYPE_FILTERS } from '@/lib/constants'

export function CommunityScreen() {
  const { posts, togglePostLike } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || post.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex-1 flex flex-col px-4 pt-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold gradient-text">Community</h1>
        <Button className="gradient-primary text-white rounded-xl">
          <Plus className="w-5 h-5 mr-2" />
          Post
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl bg-secondary/50 border-0"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {POST_TYPE_FILTERS.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedFilter === filter.id
                  ? 'gradient-primary text-white shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4 flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredPosts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <MessageCircle className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No posts found
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Be the first to share something with the community
              </p>
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-2xl p-4 space-y-4"
              >
                {/* Post Header */}
                <div className="flex items-start gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">
                        {post.author.name}
                      </h3>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{post.author.university}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Post Type Badge */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
                    {post.type}
                  </span>
                </div>

                {/* Post Content */}
                <p className="text-foreground leading-relaxed">
                  {post.content}
                </p>

                {/* Post Actions */}
                <div className="flex items-center gap-4 pt-2 border-t border-border">
                  <button
                    onClick={() => togglePostLike(post.id)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    {post.comments.length}
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>

                {/* Comments Preview */}
                {post.comments.length > 0 && (
                  <div className="pt-3 border-t border-border space-y-3">
                    {post.comments.slice(0, 2).map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2">
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 bg-secondary/50 rounded-xl px-3 py-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-foreground">
                              {comment.author.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-foreground mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                    {post.comments.length > 2 && (
                      <button className="text-sm text-primary font-medium">
                        View all {post.comments.length} comments
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
