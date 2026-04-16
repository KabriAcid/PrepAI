import React, { useState } from 'react'
import { LayoutDashboard, BookOpen, Trophy, BarChart3, TrendingUp, Layers, Settings, HelpCircle, LogOut, Menu, X } from 'lucide-react'
import clsx from 'clsx'

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
    { icon: BookOpen, label: 'My Exams', href: '#' },
    { icon: Trophy, label: 'Practice Tests', href: '#' },
    { icon: BarChart3, label: 'Results', href: '#' },
    { icon: TrendingUp, label: 'Performance', href: '#' },
    { icon: Layers, label: 'Subjects', href: '#' },
  ]

  const bottomItems = [
    { icon: Settings, label: 'Settings', href: '#' },
    { icon: HelpCircle, label: 'Help & Support', href: '#' },
  ]

  const NavLink: React.FC<{ icon: React.ComponentType; label: string; href: string; active?: boolean }> = ({ icon: Icon, label, href, active }) => (
    <a
      href={href}
      className={clsx(
        'flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base',
        active
          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-medium'
          : 'text-spiritual-700 hover:bg-spiritual-50'
      )}
    >
      <Icon size={20} className="flex-shrink-0" />
      <span className="truncate font-medium">{label}</span>
    </a>
  )

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 lg:hidden shadow-medium"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={clsx(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={clsx(
          'fixed left-0 top-0 z-40 h-screen w-72 border-r border-spiritual-200 bg-white/95 backdrop-blur-lg shadow-strong transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-screen flex-col">
          <div className="border-b border-spiritual-200 px-3 sm:px-4 py-4 sm:py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold">
                E
              </div>
              <span className="text-xl font-bold text-spiritual-900">PrepAI</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 sm:px-4 py-4">
            {navItems.map((item) => (
              <NavLink key={item.label} {...item} active={item.label === 'Dashboard'} />
            ))}

            <div className="my-4 h-px bg-spiritual-200" />

            {bottomItems.map((item) => (
              <NavLink key={item.label} {...item} />
            ))}
          </nav>

          <div className="border-t border-spiritual-200 p-3 sm:p-4">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-error-600 hover:bg-error-50 transition-all duration-300 font-medium text-sm sm:text-base">
              <LogOut size={20} />
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="hidden lg:block lg:w-72" />
    </>
  )
}

export default Sidebar
