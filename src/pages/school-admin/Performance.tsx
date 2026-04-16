import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Target,
  BookOpen,
  BarChart3,
  PieChart,
} from "lucide-react";

const Performance = () => {
  const overallStats = [
    {
      label: "Average Score",
      value: "74.5%",
      change: "+3.2%",
      trend: "up",
      icon: Target,
      color: "from-primary to-primary-dark",
    },
    {
      label: "Pass Rate",
      value: "82%",
      change: "+5.1%",
      trend: "up",
      icon: Award,
      color: "from-success to-success",
    },
    {
      label: "Active Students",
      value: "1,189",
      change: "+45",
      trend: "up",
      icon: Users,
      color: "from-secondary to-secondary-dark",
    },
    {
      label: "Completion Rate",
      value: "91%",
      change: "-2.3%",
      trend: "down",
      icon: BookOpen,
      color: "from-warning to-warning",
    },
  ];

  const subjectPerformance = [
    {
      subject: "Mathematics",
      avgScore: 78,
      students: 456,
      exams: 12,
      trend: "up",
      topScore: 98,
      lowestScore: 45,
    },
    {
      subject: "English",
      avgScore: 82,
      students: 523,
      exams: 15,
      trend: "up",
      topScore: 95,
      lowestScore: 52,
    },
    {
      subject: "Physics",
      avgScore: 71,
      students: 387,
      exams: 10,
      trend: "down",
      topScore: 92,
      lowestScore: 38,
    },
    {
      subject: "Chemistry",
      avgScore: 69,
      students: 342,
      exams: 9,
      trend: "down",
      topScore: 89,
      lowestScore: 41,
    },
    {
      subject: "Biology",
      avgScore: 76,
      students: 398,
      exams: 11,
      trend: "up",
      topScore: 94,
      lowestScore: 48,
    },
  ];

  const topPerformers = [
    {
      rank: 1,
      name: "Blessing Okoro",
      class: "SS3",
      avgScore: 92,
      examsCompleted: 14,
    },
    {
      rank: 2,
      name: "Ibrahim Musa",
      class: "SS3",
      avgScore: 89,
      examsCompleted: 15,
    },
    {
      rank: 3,
      name: "Fatima Hassan",
      class: "SS2",
      avgScore: 88,
      examsCompleted: 14,
    },
    {
      rank: 4,
      name: "Chioma Adeyemi",
      class: "SS3",
      avgScore: 85,
      examsCompleted: 12,
    },
    {
      rank: 5,
      name: "Emeka Okafor",
      class: "SS3",
      avgScore: 84,
      examsCompleted: 13,
    },
  ];

  const weakAreas = [
    { topic: "Organic Chemistry", subject: "Chemistry", avgScore: 45, attempts: 156 },
    { topic: "Calculus", subject: "Mathematics", avgScore: 52, attempts: 189 },
    { topic: "Electromagnetic Waves", subject: "Physics", avgScore: 48, attempts: 145 },
    { topic: "Genetics", subject: "Biology", avgScore: 54, attempts: 167 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-spiritual-900">
            Performance Analytics
          </h1>
          <p className="text-sm text-spiritual-600 mt-1">
            Track student performance and identify improvement areas
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overallStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm text-spiritual-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-spiritual-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-error" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-success" : "text-error"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-spiritual-600">from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Performance */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-spiritual-900">
                Subject Performance
              </h2>
              <BarChart3 className="w-5 h-5 text-spiritual-400" />
            </div>

            <div className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <div
                  key={index}
                  className="border border-spiritual-200 rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-spiritual-900">
                          {subject.subject}
                        </h3>
                        {subject.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-success" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-error" />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-spiritual-600">
                        <span>{subject.students} students</span>
                        <span>{subject.exams} exams</span>
                        <span>Top: {subject.topScore}%</span>
                        <span>Low: {subject.lowestScore}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-spiritual-900">
                        {subject.avgScore}%
                      </p>
                      <p className="text-xs text-spiritual-600">avg score</p>
                    </div>
                  </div>

                  <div className="w-full bg-spiritual-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        subject.avgScore >= 75
                          ? "bg-gradient-to-r from-success to-success"
                          : subject.avgScore >= 60
                          ? "bg-gradient-to-r from-warning to-warning"
                          : "bg-gradient-to-r from-error to-error"
                      }`}
                      style={{ width: `${subject.avgScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-spiritual-900">
                Top Performers
              </h2>
              <Award className="w-5 h-5 text-warning" />
            </div>

            <div className="space-y-3">
              {topPerformers.map((student) => (
                <div
                  key={student.rank}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-spiritual-50 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      student.rank === 1
                        ? "bg-gradient-to-br from-warning to-warning text-white"
                        : student.rank === 2
                        ? "bg-spiritual-200 text-spiritual-700"
                        : student.rank === 3
                        ? "bg-warning/20 text-warning"
                        : "bg-spiritual-100 text-spiritual-600"
                    }`}
                  >
                    {student.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-spiritual-900 text-sm">
                      {student.name}
                    </p>
                    <p className="text-xs text-spiritual-600">
                      {student.class} • {student.examsCompleted} exams
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-spiritual-900">
                      {student.avgScore}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weak Areas */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-spiritual-900">
                Areas Needing Attention
              </h2>
              <p className="text-sm text-spiritual-600">
                Topics with lowest average scores
              </p>
            </div>
            <PieChart className="w-5 h-5 text-spiritual-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weakAreas.map((area, index) => (
              <div
                key={index}
                className="border border-error/30 bg-error/5 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-spiritual-900 mb-1">
                      {area.topic}
                    </h3>
                    <p className="text-xs text-spiritual-600">{area.subject}</p>
                  </div>
                  <span className="px-2 py-1 bg-error-light text-error text-xs font-medium rounded">
                    {area.avgScore}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-spiritual-600 mt-3">
                  <span>{area.attempts} attempts</span>
                  <span className="text-error font-medium">Needs improvement</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Performance;
