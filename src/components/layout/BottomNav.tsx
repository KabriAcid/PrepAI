import React from 'react'
import { LayoutDashboard, BookOpen, BarChart3, MoreHorizontal } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

const BottomNav: React.FC = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/student/dashboard' },
    { icon: BookOpen, label: 'Take Exam', to: '/student/exams' },
    { icon: BarChart3, label: 'Results', to: '/student/results' },
    { icon: MoreHorizontal, label: 'More', to: '/student/settings' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-spiritual-200 bg-white/95 backdrop-blur-md lg:hidden">
      <div className="flex h-20">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex flex-1 flex-col items-center justify-center gap-1 transition-colors',
                isActive ? 'text-primary-600' : 'text-spiritual-600 hover:text-primary-600'
              )
            }
          >
            <item.icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
