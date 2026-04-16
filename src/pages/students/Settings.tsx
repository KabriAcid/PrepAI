import React, { useState } from 'react'
import {
  Bell,
  Globe,
  Save,
  Settings as SettingsIcon,
  Shield,
  User,
} from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

type NotificationKey =
  | 'examReminders'
  | 'performanceUpdates'
  | 'newTests'
  | 'friendRequests'
  | 'weeklyReport'

const notificationItems: Array<{
  key: NotificationKey
  title: string
  description: string
}> = [
    {
      key: 'examReminders',
      title: 'Exam Reminders',
      description: 'Remind me before scheduled exams start.',
    },
    {
      key: 'performanceUpdates',
      title: 'Performance Updates',
      description: 'Notify me when new scores and insights are published.',
    },
    {
      key: 'newTests',
      title: 'New Practice Tests',
      description: 'Notify me when new practice tests are added.',
    },
    {
      key: 'friendRequests',
      title: 'Peer Requests',
      description: 'Notify me when classmates send collaboration requests.',
    },
    {
      key: 'weeklyReport',
      title: 'Weekly Report',
      description: 'Send me a weekly summary of my progress.',
    },
  ]

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account')
  const [formData, setFormData] = useState({
    fullName: 'Kabriacid Oluwaseun',
    email: 'kabriacid@example.com',
    phone: '+234 801 234 5678',
    school: 'Kings College Lagos',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [preferences, setPreferences] = useState({
    theme: 'light',
    difficulty: 'medium',
    language: 'english',
  })

  const [notificationSettings, setNotificationSettings] = useState<Record<NotificationKey, boolean>>({
    examReminders: true,
    performanceUpdates: true,
    newTests: true,
    friendRequests: false,
    weeklyReport: true,
  })

  const toastStyle = {
    background: '#ffffff',
    color: '#0369a1',
    border: '1px solid #bae6fd',
  } as const

  const handleSave = (section: string) => {
    toast.success(`${section} saved successfully.`, {
      style: toastStyle,
    })
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setPreferences((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Layout title="Settings" streak={7}>
      <div className="space-y-6 px-3 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-spiritual-900">Settings</h1>
          <p className="mt-1 text-sm text-spiritual-600">
            Manage your account profile, notifications, and study preferences.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="rounded-xl border border-white/20 bg-white/90 p-2 shadow-soft backdrop-blur-sm">
            <TabsList className="grid w-full grid-cols-2 gap-2 bg-transparent p-0 sm:grid-cols-4">
              <TabsTrigger
                value="account"
                className="flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-all duration-300 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow-medium sm:px-4 sm:py-3"
              >
                <User className="h-4 w-4" />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-all duration-300 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow-medium sm:px-4 sm:py-3"
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-all duration-300 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow-medium sm:px-4 sm:py-3"
              >
                <SettingsIcon className="h-4 w-4" />
                <span>Preferences</span>
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-all duration-300 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow-medium sm:px-4 sm:py-3"
              >
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="account">
            <div className="space-y-6 rounded-xl border border-white/20 bg-white/90 p-6 shadow-soft backdrop-blur-sm">
              <div>
                <h2 className="mb-4 text-lg font-bold text-spiritual-900">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-spiritual-900">Full Name</label>
                    <Input name="fullName" value={formData.fullName} onChange={handleInputChange} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-spiritual-900">Email Address</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-spiritual-900">Phone Number</label>
                      <Input name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-spiritual-900">School</label>
                    <Input name="school" value={formData.school} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t pt-4">
                <Button
                  className="bg-spiritual-700 text-white hover:bg-spiritual-800"
                  onClick={() => handleSave('Account settings')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="space-y-6 rounded-xl border border-white/20 bg-white/90 p-6 shadow-soft backdrop-blur-sm">
              <div>
                <h2 className="mb-4 text-lg font-bold text-spiritual-900">Notification Preferences</h2>
                <div className="space-y-4">
                  {notificationItems.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-start justify-between rounded-lg border border-spiritual-200 p-4"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-spiritual-900">{item.title}</p>
                        <p className="mt-1 text-sm text-spiritual-600">{item.description}</p>
                      </div>
                      <Switch
                        checked={notificationSettings[item.key]}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            [item.key]: checked,
                          }))
                        }
                        aria-label={`Toggle ${item.title}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end border-t pt-4">
                <Button
                  className="bg-spiritual-700 text-white hover:bg-spiritual-800"
                  onClick={() => handleSave('Notification preferences')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <div className="space-y-6 rounded-xl border border-white/20 bg-white/90 p-6 shadow-soft backdrop-blur-sm">
              <div>
                <h2 className="mb-4 text-lg font-bold text-spiritual-900">Study Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-spiritual-900">Theme</label>
                    <select
                      name="theme"
                      value={preferences.theme}
                      onChange={handlePreferenceChange}
                      className="select-field w-full"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-spiritual-900">Default Difficulty</label>
                    <select
                      name="difficulty"
                      value={preferences.difficulty}
                      onChange={handlePreferenceChange}
                      className="select-field w-full"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-spiritual-900">Language</label>
                    <select
                      name="language"
                      value={preferences.language}
                      onChange={handlePreferenceChange}
                      className="select-field w-full"
                    >
                      <option value="english">English</option>
                      <option value="french">French</option>
                      <option value="spanish">Spanish</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t pt-4">
                <Button
                  className="bg-spiritual-700 text-white hover:bg-spiritual-800"
                  onClick={() => handleSave('Study preferences')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6 rounded-xl border border-white/20 bg-white/90 p-6 shadow-soft backdrop-blur-sm">
              <div>
                <h2 className="mb-4 text-lg font-bold text-spiritual-900">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-spiritual-900">Current Password</label>
                    <Input
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-spiritual-900">New Password</label>
                    <Input
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-spiritual-900">Confirm New Password</label>
                    <Input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="rounded-lg bg-spiritual-50 p-4">
                    <p className="mb-2 text-sm font-medium text-spiritual-900">Privacy Mode</p>
                    <p className="text-xs text-spiritual-600">
                      Hide your profile from class ranking boards when enabled.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t pt-4">
                <Button
                  className="bg-spiritual-700 text-white hover:bg-spiritual-800"
                  onClick={() => handleSave('Security settings')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default Settings
