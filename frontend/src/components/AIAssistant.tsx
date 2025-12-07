'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  action?: any
}

interface QuickAction {
  id: string
  icon: string
  label: string
  description: string
  prompt: string
}

export default function AIAssistant() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [quickActions, setQuickActions] = useState<QuickAction[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Load quick actions on mount
  useEffect(() => {
    fetch('http://localhost:8000/api/ai/quick-actions')
      .then(res => res.json())
      .then(data => setQuickActions(data.actions))
      .catch(err => console.error('Error loading quick actions:', err))
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Add welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: '👋 Hi! I can help you create documents, spreadsheets, presentations, and more. Just tell me what you need in plain English!',
        timestamp: new Date()
      }])
    }
  }, [isOpen, messages.length])

  const getCurrentContext = () => {
    if (pathname?.includes('dashboard-docx')) return 'docx'
    if (pathname?.includes('dashboard-xlsx')) return 'xlsx'
    if (pathname?.includes('dashboard-pptx')) return 'pptx'
    if (pathname?.includes('dashboard-pdf')) return 'pdf'
    if (pathname?.includes('dashboard-themes')) return 'themes'
    if (pathname?.includes('dashboard-polish')) return 'polish'
    return 'home'
  }

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call AI API
      const response = await fetch('http://localhost:8000/api/ai/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          context: getCurrentContext()
        }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.suggestion || 'I can help with that!',
        timestamp: new Date(),
        action: data.action
      }
      setMessages(prev => [...prev, assistantMessage])

      // Auto-execute action if provided
      if (data.action && data.action.type === 'navigate') {
        setTimeout(() => {
          executeAction(data.action)
        }, 800)
      }

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please check that the backend is running at http://localhost:8000',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const executeAction = (action: any) => {
    if (action.type === 'navigate') {
      // Store pre-fill data in localStorage for the target page to read
      if (action.pre_fill) {
        localStorage.setItem('ai_prefill', JSON.stringify(action.pre_fill))
      }
      router.push(action.target)
      // Don't close the chat - let user see what happened
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    handleSend(action.prompt)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-2xl shadow-violet-500/50 hover:shadow-violet-600/60 hover:scale-110 transition-all duration-200 flex items-center justify-center text-4xl z-50"
          title="AI Assistant"
        >
          🤖
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-[420px] h-[650px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-violet-600 to-purple-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <div className="font-semibold text-lg">AI Assistant</div>
                <div className="text-xs text-violet-100 flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
                      Thinking...
                    </>
                  ) : (
                    <>
                      <span className="inline-block w-2 h-2 bg-green-300 rounded-full"></span>
                      Ready
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-2xl transition-colors"
            >
              ×
            </button>
          </div>

          {/* Quick Actions (show when no conversation) */}
          {messages.length <= 1 && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                ⚡ Quick Actions
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action)}
                    className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950 transition-all text-left group"
                  >
                    <div className="text-2xl mb-1">{action.icon}</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400">
                      {action.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-violet-600 to-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                  }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                  {message.action && message.action.type === 'navigate' && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      → Navigating to {message.action.target}...
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me to create something..."
                rows={1}
                className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-violet-500 dark:focus:border-violet-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                style={{ maxHeight: '120px' }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`px-5 rounded-xl font-semibold transition-all text-lg ${
                  input.trim() && !isLoading
                    ? 'bg-gradient-to-br from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/30'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                ➤
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 text-center">
              Press Enter to send • Shift+Enter for new line
            </div>
          </div>
        </div>
      )}
    </>
  )
}
