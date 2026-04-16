import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Users,
  BarChart3,
  Award,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Results = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const examResults = [
    {
      examId: "EXM003",
      examTitle: "NECO Chemistry Test",
      date: "Nov 10, 2025",
      totalStudents: 156,
      completed: 156,
      avgScore: 72,
      passRate: 84,
      highestScore: 98,
      lowestScore: 35,
    },
    {
      examId: "EXM004",
      examTitle: "Internal Biology Assessment",
      date: "Nov 12, 2025",
      totalStudents: 210,
      completed: 203,
      avgScore: 68,
      passRate: 79,
      highestScore: 95,
      lowestScore: 28,
    },
    {
      examId: "EXM005",
      examTitle: "JAMB English Language Mock",
      date: "Nov 15, 2025",
      totalStudents: 189,
      completed: 145,
      avgScore: 75,
      passRate: 87,
      highestScore: 96,
      lowestScore: 42,
    },
  ];

  const recentResults = [
    {
      studentName: "Blessing Okoro",
      studentId: "STD003",
      examTitle: "JAMB English Language Mock",
      score: 92,
      status: "passed",
      submittedAt: "2 hours ago",
    },
    {
      studentName: "Ibrahim Musa",
      studentId: "STD002",
      examTitle: "JAMB English Language Mock",
      score: 85,
      status: "passed",
      submittedAt: "3 hours ago",
    },
    {
      studentName: "Chioma Adeyemi",
      studentId: "STD001",
      examTitle: "JAMB English Language Mock",
      score: 78,
      status: "passed",
      submittedAt: "4 hours ago",
    },
    {
      studentName: "Emeka Okafor",
      studentId: "STD004",
      examTitle: "Internal Biology Assessment",
      score: 38,
      status: "failed",
      submittedAt: "5 hours ago",
    },
  ];

  const stats = [
    { label: "Total Results", value: "3,456", icon: BarChart3 },
    { label: "Avg Score", value: "72%", icon: Award },
    { label: "Pass Rate", value: "83%", icon: CheckCircle },
    { label: "This Week", value: "145", icon: Calendar },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-spiritual-900">
              Exam Results
            </h1>
            <p className="text-sm text-spiritual-600 mt-1">
              View and analyze all examination results
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export All Results
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-spiritual-600">{stat.label}</p>
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl font-bold text-spiritual-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-spiritual-400" />
              <Input
                placeholder="Search by exam title, student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Exam Results Summary */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-spiritual-900">
            Completed Exams
          </h2>
          {examResults.map((exam) => (
            <div
              key={exam.examId}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20 hover:shadow-medium transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-spiritual-900 mb-1">
                        {exam.examTitle}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-spiritual-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exam.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {exam.completed}/{exam.totalStudents} completed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-spiritual-50 rounded-lg p-3">
                      <p className="text-xs text-spiritual-600 mb-1">
                        Average Score
                      </p>
                      <p className="text-2xl font-bold text-spiritual-900">
                        {exam.avgScore}%
                      </p>
                    </div>
                    <div className="bg-success-light rounded-lg p-3">
                      <p className="text-xs text-success mb-1">Pass Rate</p>
                      <p className="text-2xl font-bold text-success">
                        {exam.passRate}%
                      </p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3">
                      <p className="text-xs text-primary mb-1">Highest</p>
                      <p className="text-2xl font-bold text-primary">
                        {exam.highestScore}%
                      </p>
                    </div>
                    <div className="bg-error-light rounded-lg p-3">
                      <p className="text-xs text-error mb-1">Lowest</p>
                      <p className="text-2xl font-bold text-error">
                        {exam.lowestScore}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary-dark text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Submissions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20">
          <h2 className="text-lg font-bold text-spiritual-900 mb-4">
            Recent Submissions
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-spiritual-50 border-b border-spiritual-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-spiritual-700 uppercase">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-spiritual-700 uppercase">
                    Exam
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-spiritual-700 uppercase">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-spiritual-700 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-spiritual-700 uppercase">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-spiritual-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-spiritual-200">
                {recentResults.map((result, index) => (
                  <tr key={index} className="hover:bg-spiritual-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-spiritual-900 text-sm">
                          {result.studentName}
                        </p>
                        <p className="text-xs text-spiritual-600">
                          {result.studentId}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-spiritual-900">
                        {result.examTitle}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-lg font-bold text-spiritual-900">
                        {result.score}%
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          result.status === "passed"
                            ? "bg-success-light text-success"
                            : "bg-error-light text-error"
                        }`}
                      >
                        {result.status === "passed" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {result.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-spiritual-600">
                        {result.submittedAt}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Results;
