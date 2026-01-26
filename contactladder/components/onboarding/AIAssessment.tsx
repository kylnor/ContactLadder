'use client'

import { useState } from 'react'
import { Send, Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Message {
  role: 'assistant' | 'user'
  content: string
}

interface AIAssessmentProps {
  userName: string
  userId: string
}

export function AIAssessment({ userName, userId }: AIAssessmentProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi ${userName}! 👋 I'm your Cloze training assistant. I'm here to create a personalized learning path just for you.\n\nTo get started, I'd love to learn about your experience with Cloze. This will only take 2-3 minutes, and I'll recommend the perfect modules for your needs.\n\nFirst question: **How long have you been using Cloze?**\n\nA) Just getting started - brand new to Cloze\nB) A few weeks - still learning the basics\nC) A few months - comfortable with core features\nD) 6+ months - using it regularly\nE) Over a year - pretty experienced`
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/onboarding/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          userId
        })
      })

      const data = await response.json()

      if (data.complete) {
        setIsComplete(true)
        setMessages([...updatedMessages, {
          role: 'assistant',
          content: data.message
        }])

        // Wait 2 seconds then redirect
        setTimeout(() => {
          router.push('/dashboard')
          router.refresh()
        }, 2000)
      } else {
        setMessages([...updatedMessages, {
          role: 'assistant',
          content: data.message
        }])
      }
    } catch (error) {
      console.error('Assessment error:', error)
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: "I'm having trouble right now. Let's continue - what would you like to focus on?"
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2c66e2] to-[#4DBDBD]">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Let's Customize Your Learning Path
        </h1>
        <p className="mt-2 text-gray-600">
          AI-powered personalization • Takes 2-3 minutes
        </p>
      </div>

      {/* Chat Messages */}
      <div className="mb-6 space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm" style={{ minHeight: '400px', maxHeight: '500px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-[#2c66e2] text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
              <span className="text-sm text-gray-600">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {!isComplete && (
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#2c66e2] focus:outline-none focus:ring-2 focus:ring-[#2c66e2]"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            size="lg"
            className="px-6"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      )}

      {isComplete && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
          <p className="text-green-800 font-medium">
            ✅ Assessment complete! Redirecting to your personalized dashboard...
          </p>
        </div>
      )}
    </div>
  )
}
