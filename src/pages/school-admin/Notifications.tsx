import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  Check,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Exam Completed",
      message: "156 students completed JAMB Chemistry Mock successfully",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "New Student Registration",
      message: "45 new students have been registered to your school",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Low Performance Alert",
      message: "12 students scored below 40% in Physics exam",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      type: "success",
      title: "Question Bank Updated",
      message: "120 new questions added to Mathematics subject",
      time: "2 days ago",
      read: true,
    },
    {
      id: 5,
      type: "info",
      title: "Upcoming Exam Reminder",
      message: "WAEC Mathematics Practice scheduled for Nov 20, 2025",
      time: "3 days ago",
      read: true,
    },
    {
      id: 6,
      type: "warning",
      title: "System Maintenance",
      message: "Scheduled maintenance on Nov 25, 2025 from 2:00 AM - 4:00 AM",
      time: "4 days ago",
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-success-light";
      case "warning":
        return "bg-warning-light";
      default:
        return "bg-primary/10";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-spiritual-900">
              Notifications
            </h1>
            <p className="text-sm text-spiritual-600 mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20">
            <p className="text-sm text-spiritual-600 mb-1">All</p>
            <p className="text-3xl font-bold text-spiritual-900">
              {notifications.length}
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20">
            <p className="text-sm text-spiritual-600 mb-1">Unread</p>
            <p className="text-3xl font-bold text-primary">{unreadCount}</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20">
            <p className="text-sm text-spiritual-600 mb-1">Read</p>
            <p className="text-3xl font-bold text-spiritual-900">
              {notifications.length - unreadCount}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-spiritual-600" />
            <span className="text-sm font-medium text-spiritual-900 mr-3">
              Filter:
            </span>
            {["all", "unread", "read"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === filterType
                    ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-medium"
                    : "bg-spiritual-100 text-spiritual-700 hover:bg-spiritual-200"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border transition-all duration-300 hover:shadow-medium ${
                notification.read
                  ? "border-white/20"
                  : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${getTypeColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-spiritual-900 mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-spiritual-600">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-spiritual-600">
                      {notification.time}
                    </span>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <button className="text-xs text-primary hover:text-primary-dark font-medium">
                          Mark as read
                        </button>
                      )}
                      <button className="p-1.5 rounded-lg hover:bg-error-light transition-colors">
                        <Trash2 className="w-4 h-4 text-spiritual-600 hover:text-error" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (Hidden when there are notifications) */}
        {notifications.length === 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-12 shadow-soft border border-white/20 text-center">
            <Bell className="w-16 h-16 text-spiritual-300 mx-auto mb-4" />
            <p className="text-spiritual-600">No notifications yet</p>
            <p className="text-sm text-spiritual-500 mt-2">
              You're all caught up!
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Notifications;
