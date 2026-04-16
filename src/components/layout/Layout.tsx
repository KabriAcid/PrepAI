import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import BottomNav from './BottomNav'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  streak?: number
}

const titleDescriptions: Record<string, string> = {
  Dashboard: 'Track your progress, activity, and upcoming study tasks at a glance.',
  'Take Exam': 'Complete your mock exam session and review your performance in real time.',
  Results: 'Review your latest scores, accuracy, and overall exam outcomes.',
  'Practice Tests': 'Choose targeted tests to strengthen weak areas and improve speed.',
  'Help & Support': 'Find answers to common questions and get assistance when needed.',
  Settings: 'Manage your account profile, notifications, and study preferences.',
  Subjects: 'Explore subject areas and focus your preparation by topic.',
  'Performance Analytics': 'Analyze trends in your scores and track improvement over time.',
}

const Layout: React.FC<LayoutProps> = ({ children, title, streak }) => {
  const showTitleBlock = Boolean(title && title !== 'Dashboard')
  const description = title ? (titleDescriptions[title] ?? 'Manage your learning and exam workflow from this page.') : ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Sidebar />
      <Header streak={streak} />
      <main className="lg:ml-72 pt-14 pb-24 lg:pb-8">
        {showTitleBlock && (
          <div className="px-3 sm:px-6 lg:px-8 pt-2 sm:pt-3 pb-3 sm:pb-4">
            <h1 className="text-2xl font-bold text-spiritual-900 sm:text-3xl">{title}</h1>
            <p className="mt-1 text-sm text-spiritual-600">{description}</p>
          </div>
        )}
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout
