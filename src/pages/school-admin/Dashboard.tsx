import { AdminLayout } from "@/components/admin/AdminLayout";
import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Play,
  BarChart3,
  Clock,
  Calendar,
  Rocket,
  FileText,
  Upload,
  User,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    {
      label: "Total Students",
      value: "1,234",
      change: "+12 this week",
      icon: Users,
      iconBg: "bg-primary-100",
      iconColor: "text-primary-600",
    },
    {
      label: "Active Exams",
      value: "8",
      change: "3 scheduled",
      icon: BookOpen,
      iconBg: "bg-secondary-100",
      iconColor: "text-secondary-600",
    },
    {
      label: "Completed",
      value: "156",
      change: "+24 this week",
      icon: CheckCircle2,
      iconBg: "bg-success-100",
      iconColor: "text-success-600",
    },
    {
      label: "Avg Performance",
      value: "78%",
      change: "+3% from last week",
      icon: TrendingUp,
      iconBg: "bg-warning-100",
      iconColor: "text-warning-600",
    },
  ];

  const upcomingExams = [
    {
      title: "JAMB Physics 2025 Mock",
      subject: "Physics",
      date: "Nov 17, 2025",
      time: "10:08 AM",
      duration: "2 hours",
      questions: "40 Qs",
      students: 145,
    },
    {
      title: "WAEC Mathematics Practice",
      subject: "Mathematics",
      date: "Nov 20, 2025",
      time: "09:00 AM",
      duration: "3 hours",
      questions: "50 Qs",
      students: 198,
    },
    {
      title: "NECO English Language Test",
      subject: "English",
      date: "Nov 22, 2025",
      time: "11:00 AM",
      duration: "2 hours",
      questions: "60 Qs",
      students: 210,
    },
  ];

  const quickActions = [
    {
      title: "Add Student",
      description: "Register a new student",
      icon: Users,
      color: "text-primary-600",
    },
    {
      title: "Export Questions",
      description: "Download questions as PDF",
      icon: FileText,
      color: "text-secondary-600",
    },
    {
      title: "View Analytics",
      description: "Check performance data",
      icon: BarChart3,
      color: "text-success-600",
    },
    {
      title: "Import Students",
      description: "Bulk upload via CSV",
      icon: Upload,
      color: "text-warning-600",
    },
  ];

  const recentActivity = [
    {
      action: "156 students completed JAMB Chemistry Mock",
      time: "2 hours ago",
      type: "success",
    },
    {
      action: "New batch of 45 students registered",
      time: "5 hours ago",
      type: "info",
    },
    {
      action: "WAEC Biology Practice Test scheduled",
      time: "1 day ago",
      type: "info",
    },
    {
      action: "Question bank updated with 120 new questions",
      time: "2 days ago",
      type: "success",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white shadow-strong sm:rounded-3xl sm:p-8">
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2">
              Welcome back, Admin! 👋
            </h1>
            <p className="text-sm text-white/90 sm:text-base">
              Manage your school's examination system efficiently
            </p>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
            <Rocket className="w-32 h-32 sm:w-40 sm:h-40" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-soft border border-white/20 hover:shadow-medium transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm text-spiritual-600 mb-1">{stat.label}</p>
                  <p className="text-3xl sm:text-4xl font-bold text-spiritual-900 truncate">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.iconBg} rounded-xl p-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-xs font-medium text-success-600 sm:text-sm">
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Upcoming Exams */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-soft border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-spiritual-900">
                Upcoming Exams
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-600 hover:text-primary-700"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-spiritual-200 p-4 transition-all duration-300 hover:border-primary-300 hover:shadow-medium"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-spiritual-900 mb-1">
                        {exam.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-spiritual-600">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {exam.subject}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {exam.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {exam.questions}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm mt-3 pt-3 border-t border-spiritual-200">
                    <span className="text-spiritual-600">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {exam.date} at {exam.time}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-primary-600">
                      <User className="w-4 h-4" />
                      {exam.students} enrolled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Rankings Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-soft border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-spiritual-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-warning-600" />
                Top Students
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-600 hover:text-primary-700"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { rank: 1, name: "Blessing Okoro", score: 92, class: "SS2", trend: "+5%" },
                { rank: 2, name: "Fatima Hassan", score: 88, class: "SS2", trend: "+3%" },
                { rank: 3, name: "Chioma Adeyemi", score: 85, class: "SS3", trend: "+2%" },
                { rank: 4, name: "Ibrahim Musa", score: 78, class: "SS3", trend: "+1%" },
                { rank: 5, name: "Emeka Okafor", score: 71, class: "SS3", trend: "-1%" },
              ].map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-spiritual-200 p-3 transition-all duration-300 hover:border-primary-300 hover:shadow-soft"
                >
                  {/* Rank Badge */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${student.rank === 1
                      ? "bg-gradient-to-br from-warning-500 to-warning-600 text-white shadow-medium"
                      : student.rank === 2
                        ? "bg-spiritual-100 text-spiritual-700"
                        : student.rank === 3
                          ? "bg-spiritual-100 text-spiritual-700"
                          : "bg-spiritual-50 text-spiritual-600"
                      }`}
                  >
                    {student.rank === 1 ? "🥇" : student.rank === 2 ? "🥈" : student.rank === 3 ? "🥉" : student.rank}
                  </div>

                  {/* Student Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-spiritual-900 truncate text-sm">
                      {student.name}
                    </p>
                    <p className="text-xs text-spiritual-600">{student.class}</p>
                  </div>

                  {/* Score & Trend */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary-600">{student.score}%</p>
                    <p
                      className={`text-xs font-medium ${student.trend.startsWith("+") ? "text-success-600" : "text-error-600"
                        }`}
                    >
                      {student.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Link */}
            <Link to="/admin/performance">
              <Button
                variant="outline"
                className="mt-4 w-full border-spiritual-200 hover:border-primary-300 hover:bg-primary-50"
              >
                View Full Rankings
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Actions & Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Quick Actions */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-soft border border-white/20">
            <h2 className="text-lg sm:text-xl font-bold text-spiritual-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-spiritual-50 transition-all duration-300 text-left group"
                >
                  <div className="p-2 bg-spiritual-100 rounded-lg transition-colors group-hover:bg-spiritual-200">
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-spiritual-900 text-sm">
                      {action.title}
                    </p>
                    <p className="text-xs text-spiritual-600">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-spiritual-400 transition-all group-hover:translate-x-1 group-hover:text-primary-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-soft border border-white/20">
            <h2 className="text-lg sm:text-xl font-bold text-spiritual-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${activity.type === "success"
                      ? "bg-success-500"
                      : "bg-primary-500"
                      }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-spiritual-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-spiritual-600 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
