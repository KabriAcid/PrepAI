import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import BottomNav from './BottomNav'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  streak?: number
}

const Layout: React.FC<LayoutProps> = ({ children, title, streak }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Sidebar />
      <Header title={title} streak={streak} />
      <main className="lg:ml-72 pt-16 pb-24 lg:pb-8">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout
