import React, { useState } from 'react'
import { Settings as SettingsIcon, User, Bell, Lock, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Tabs from '@/components/ui/tabs'

const Settings: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Kabriacid Oluwaseun',
    email: 'kabriacid@example.com',
    phone: '+234 801 234 5678',
    school: 'Kings College Lagos',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [notifications, setNotifications] = useState({
    examReminders: true,
    performanceUpdates: true,
    newTests: true,
    friendRequests: false,
    weeklyReport: true,
  })

  const [preferences, setPreferences] = useState({
    theme: 'light',
    difficulty: 'medium',
    language: 'english',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setPreferences(prev => ({ ...prev, [name]: value }))
  }

  const accountTab = (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <Card className="p-4 sm:p-6">
        <h3 className="mb-6 font-bold text-spiritual-900">Personal Information</h3>
        <div className="space-y-4">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Input
            label="School"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
          />
          <Button variant="primary" fullWidth>
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <h3 className="mb-6 font-bold text-spiritual-900">Change Password</h3>
        <div className="space-y-4">
          <div>
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              label="New Password"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={handleInputChange}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-spiritual-600 hover:text-spiritual-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <Button variant="primary" fullWidth>
            Update Password
          </Button>
        </div>
      </Card>

      <Card className="p-4 sm:p-6 border-l-4 border-l-error-500">
        <h3 className="mb-4 font-bold text-error-600">Danger Zone</h3>
        <p className="mb-4 text-sm text-spiritual-700">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="danger" fullWidth>
          Delete Account
        </Button>
      </Card>
    </motion.div>
  )

  const notificationsTab = (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <Card className="p-4 sm:p-6">
        <h3 className="mb-6 font-bold text-spiritual-900">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 hover:bg-spiritual-50 rounded-lg transition-colors">
              <label className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleNotificationChange(key as keyof typeof notifications)}
                  className="rounded-lg"
                />
                <span className="font-medium text-spiritual-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
              <div className={`h-2 w-2 rounded-full ${value ? 'bg-success-500' : 'bg-spiritual-300'}`} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 sm:p-6 bg-gradient-to-r from-primary-50 to-secondary-50">
        <p className="text-sm text-spiritual-700">
          <strong>Tip:</strong> Disable notifications you don't need to reduce distractions and improve focus.
        </p>
      </Card>
    </motion.div>
  )

  const preferencesTab = (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <Card className="p-4 sm:p-6">
        <h3 className="mb-6 font-bold text-spiritual-900">Study Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-spiritual-700">Theme</label>
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
            <label className="mb-2 block text-sm font-medium text-spiritual-700">Default Difficulty</label>
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
            <label className="mb-2 block text-sm font-medium text-spiritual-700">Language</label>
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

          <Button variant="primary" fullWidth>
            Save Preferences
          </Button>
        </div>
      </Card>
    </motion.div>
  )

  const tabs = [
    { id: 'account', label: 'Account', content: accountTab, icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', content: notificationsTab, icon: <Bell size={18} /> },
    { id: 'preferences', label: 'Preferences', content: preferencesTab, icon: <SettingsIcon size={18} /> },
  ]

  return (
    <Layout title="Settings" streak={7}>
      <div className="space-y-6 px-3 sm:px-6 lg:px-8">
        <Card className="p-4 sm:p-6">
          <Tabs tabs={tabs} defaultTab="account" />
        </Card>
      </div>
    </Layout>
  )
}

const Danger = ({ variant }: { variant: string }) => (
  <Button variant={variant as any} fullWidth>
    Delete Account
  </Button>
)

export default Settings
