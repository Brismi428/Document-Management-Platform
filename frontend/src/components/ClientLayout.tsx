'use client'

import AIAssistant from './AIAssistant'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AIAssistant />
    </>
  )
}
