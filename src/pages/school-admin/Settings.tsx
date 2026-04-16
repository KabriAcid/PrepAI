import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import {
  Building,
  User,
  Bell,
  Shield,
  Globe,
  Save,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("school");

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-spiritual-900">
            Settings
          </h1>
          <p className="text-sm text-spiritual-600 mt-1">
            Manage your school profile and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 p-2">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 bg-transparent p-0">
              <TabsTrigger
                value="school"
                className="flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-dark data-[state=active]:text-white data-[state=active]:shadow-medium rounded-lg transition-all duration-300"
              >
                <Building className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">School</span>
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-dark data-[state=active]:text-white data-[state=active]:shadow-medium rounded-lg transition-all duration-300"
              >
                <User className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-dark data-[state=active]:text-white data-[state=active]:shadow-medium rounded-lg transition-all duration-300"
              >
                <Bell className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-dark data-[state=active]:text-white data-[state=active]:shadow-medium rounded-lg transition-all duration-300"
              >
                <Shield className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className="flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-dark data-[state=active]:text-white data-[state=active]:shadow-medium rounded-lg transition-all duration-300 col-span-2 sm:col-span-1"
              >
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">System</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* School Profile */}
          <TabsContent value="school">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-spiritual-900 mb-4">
                  School Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      School Logo
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">E</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        School Name
                      </label>
                      <Input placeholder="Enter school name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        School Code
                      </label>
                      <Input placeholder="e.g., SCH001" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      Address
                    </label>
                    <Input placeholder="Full address" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        Email
                      </label>
                      <Input type="email" placeholder="school@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        Phone
                      </label>
                      <Input placeholder="+234 XXX XXX XXXX" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        State
                      </label>
                      <select className="w-full px-3 py-2 border border-spiritual-300 rounded-lg">
                        <option>Lagos</option>
                        <option>Abuja</option>
                        <option>Rivers</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        Country
                      </label>
                      <Input value="Nigeria" readOnly />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button className="bg-gradient-to-r from-primary to-primary-dark">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Admin Profile */}
          <TabsContent value="profile">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-spiritual-900 mb-4">
                  Admin Profile
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">A</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        First Name
                      </label>
                      <Input placeholder="Enter first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        Last Name
                      </label>
                      <Input placeholder="Enter last name" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="admin@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      Phone Number
                    </label>
                    <Input placeholder="+234 XXX XXX XXXX" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      Role
                    </label>
                    <Input value="Super Administrator" readOnly />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button className="bg-gradient-to-r from-primary to-primary-dark">
                  <Save className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-spiritual-900 mb-4">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      title: "Exam Completion",
                      description: "Notify when students complete exams",
                    },
                    {
                      title: "New Student Registration",
                      description: "Notify when new students register",
                    },
                    {
                      title: "Low Performance Alerts",
                      description: "Notify about students with low scores",
                    },
                    {
                      title: "System Updates",
                      description: "Notify about system updates and maintenance",
                    },
                    {
                      title: "Weekly Reports",
                      description: "Receive weekly performance summary",
                    },
                  ].map((notif, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 border border-spiritual-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-spiritual-900">
                          {notif.title}
                        </p>
                        <p className="text-sm text-spiritual-600 mt-1">
                          {notif.description}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="w-5 h-5 mt-1"
                        defaultChecked
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button className="bg-gradient-to-r from-primary to-primary-dark">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-spiritual-900 mb-4">
                  Security Settings
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      Current Password
                    </label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      New Password
                    </label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      Confirm New Password
                    </label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>

                  <div className="p-4 bg-spiritual-50 rounded-lg">
                    <p className="text-sm font-medium text-spiritual-900 mb-2">
                      Two-Factor Authentication
                    </p>
                    <p className="text-xs text-spiritual-600 mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button className="bg-gradient-to-r from-primary to-primary-dark">
                  <Save className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* System */}
          <TabsContent value="system">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-spiritual-900 mb-4">
                  System Configuration
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      Time Zone
                    </label>
                    <select className="w-full px-3 py-2 border border-spiritual-300 rounded-lg">
                      <option>Africa/Lagos (WAT)</option>
                      <option>Africa/Accra (GMT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      Date Format
                    </label>
                    <select className="w-full px-3 py-2 border border-spiritual-300 rounded-lg">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      Default Exam Duration
                    </label>
                    <Input type="number" placeholder="120" />
                    <p className="text-xs text-spiritual-600 mt-1">
                      Default duration in minutes
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-spiritual-900 mb-2">
                      Passing Score (%)
                    </label>
                    <Input type="number" placeholder="40" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button className="bg-gradient-to-r from-primary to-primary-dark">
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
