import React from 'react'
import { LayoutDashboard, BookOpen, BarChart3, MoreHorizontal } from 'lucide-react'
import clsx from 'clsx'

const BottomNav: React.FC = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
    { icon: BookOpen, label: 'Practice', href: '#' },
    { icon: BarChart3, label: 'Results', href: '#' },
    { icon: MoreHorizontal, label: 'More', href: '#' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-spiritual-200 bg-white/95 backdrop-blur-md lg:hidden">
      <div className="flex h-20">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-1 flex-col items-center justify-center gap-1 text-spiritual-600 hover:text-primary-600 transition-colors"
          >
            <item.icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
