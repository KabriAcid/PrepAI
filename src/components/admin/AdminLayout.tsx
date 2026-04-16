import { ReactNode, useState, useEffect, useRef } from "react";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  TrendingUp,
  Layers,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  Mail,
} from "lucide-react";
import Logo from "../Logo";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Students", href: "/admin/students", icon: Users },
  { name: "Question Bank", href: "/admin/questions", icon: FileText },
  { name: "Results", href: "/admin/results", icon: BarChart3 },
  { name: "Performance", href: "/admin/performance", icon: TrendingUp },
  { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
  { name: "Help & Support", href: "/admin/support", icon: HelpCircle },
];

const notifications = [
  {
    id: 1,
    title: "Exam Completed",
    message: "156 students completed JAMB Chemistry Mock",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    title: "New Student Registration",
    message: "45 new students have been registered",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: 3,
    title: "Low Performance Alert",
    message: "12 students scored below 40% in Physics",
    time: "1 day ago",
    unread: false,
  },
];

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-50 to-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white/95 backdrop-blur-lg border-r border-spiritual-200 shadow-strong">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-spiritual-200">
            <Logo size="sm" showText={false} />
            <div>
              <h1 className="text-lg font-bold text-spiritual-900">PrepAI</h1>
              <p className="text-xs text-spiritual-600">Admin Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === "/admin"}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-spiritual-700 hover:bg-spiritual-50 transition-all duration-300"
                activeClassName="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-medium"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="px-3 py-4 border-t border-spiritual-200">
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-spiritual-700 hover:bg-error-light hover:text-error transition-all duration-300">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-spiritual-900/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-72 bg-white/95 backdrop-blur-lg border-r border-spiritual-200 shadow-strong">
            <div className="flex items-center justify-between px-6 py-5 border-b border-spiritual-200">
              <div className="flex items-center gap-3">
                <Logo size="sm" showText={false} />
                <div>
                  <h1 className="text-lg font-bold text-spiritual-900">PrepAI</h1>
                  <p className="text-xs text-spiritual-600">Admin Portal</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-spiritual-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="px-3 py-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/admin"}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-spiritual-700 hover:bg-spiritual-50 transition-all duration-300"
                  activeClassName="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-medium"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-spiritual-200 shadow-soft">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-spiritual-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-spiritual-900" />
            </button>

            <div className="flex items-center gap-3 flex-1 lg:flex-none">
              <Logo size="sm" showText={false} />
              <div>
                <h2 className="text-base sm:text-lg font-bold text-spiritual-900">
                  PrepAI School
                </h2>
                <p className="text-xs text-spiritual-600 hidden sm:block">Admin Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-spiritual-100 transition-colors"
                >
                  <Bell className="w-5 h-5 text-spiritual-700" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-error-500" />
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-strong border border-spiritual-200 z-50">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-spiritual-200">
                      <h3 className="font-semibold text-spiritual-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          className={`w-full border-b border-spiritual-100 px-4 py-3 text-left transition-colors last:border-0 hover:bg-spiritual-50 ${notification.unread ? 'bg-primary-50' : ''
                            }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${notification.unread ? 'bg-primary-500' : 'bg-transparent'
                              }`} />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-spiritual-900 mb-1">
                                {notification.title}
                              </p>
                              <p className="text-xs text-spiritual-600 mb-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-spiritual-500">{notification.time}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <Link to="/admin/notifications">
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="w-full border-t border-spiritual-200 px-4 py-2.5 text-center text-sm font-medium text-primary-700 transition-colors hover:bg-spiritual-50"
                      >
                        View All Notifications
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-spiritual-100 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                    <span className="text-white font-semibold text-sm">A</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-spiritual-700 hidden sm:block transition-transform ${profileOpen ? 'rotate-180' : ''
                    }`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-strong border border-spiritual-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-spiritual-200">
                      <p className="font-semibold text-spiritual-900 text-sm">Admin User</p>
                      <p className="text-xs text-spiritual-600">admin@school.com</p>
                    </div>
                    <Link to="/admin/settings">
                      <button
                        onClick={() => setProfileOpen(false)}
                        className="w-full px-4 py-2 text-left text-sm text-spiritual-700 hover:bg-spiritual-50 transition-colors flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                    </Link>
                    <Link to="/admin/settings">
                      <button
                        onClick={() => setProfileOpen(false)}
                        className="w-full px-4 py-2 text-left text-sm text-spiritual-700 hover:bg-spiritual-50 transition-colors flex items-center gap-2"
                      >
                        <SettingsIcon className="w-4 h-4" />
                        Settings
                      </button>
                    </Link>
                    <hr className="my-2 border-spiritual-200" />
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-error-600 transition-colors hover:bg-error-50">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};
