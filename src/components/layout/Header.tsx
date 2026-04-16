import React, { useState } from 'react'
import { Bell, ChevronDown, Flame } from 'lucide-react'
import clsx from 'clsx'

interface HeaderProps {
  title?: string
  streak?: number
}

const Header: React.FC<HeaderProps> = ({ title = 'Dashboard', streak = 7 }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const notifications = [
    { id: 1, message: 'You completed Physics exam!', time: '2 hours ago' },
    { id: 2, message: 'New practice test available', time: '5 hours ago' },
    { id: 3, message: 'You ranked #15 in class', time: '1 day ago' },
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-spiritual-200 bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:ml-72">
        <h1 className="hidden lg:block text-2xl font-bold text-spiritual-900">{title}</h1>

        <div className="flex-1 lg:flex-none" />

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-warning-50 to-orange-50 px-3 py-2">
            <Flame size={20} className="text-warning-500 animate-float" />
            <span className="text-sm sm:text-base font-bold text-warning-600">{streak}</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative rounded-lg p-2 hover:bg-spiritual-50 transition-colors"
            >
              <Bell size={20} className="text-spiritual-600" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-error-500" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-white/20 bg-white/90 shadow-strong backdrop-blur-sm">
                <div className="border-b border-spiritual-200 p-4">
                  <h3 className="font-semibold text-spiritual-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="border-b border-spiritual-100 p-4 hover:bg-spiritual-50 transition-colors cursor-pointer"
                    >
                      <p className="text-sm text-spiritual-700">{notif.message}</p>
                      <p className="mt-1 text-xs text-spiritual-500">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 rounded-lg hover:bg-spiritual-50 transition-colors p-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-sm font-bold text-white">
                KB
              </div>
              <ChevronDown size={16} className="hidden sm:block text-spiritual-600" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/20 bg-white/90 shadow-strong backdrop-blur-sm">
                <div className="space-y-1 p-2">
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm text-spiritual-700 hover:bg-spiritual-50 transition-colors"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm text-spiritual-700 hover:bg-spiritual-50 transition-colors"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors"
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
