import { AdminLayout } from "@/components/admin/AdminLayout";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  BarChart3,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const StudentDetail = () => {
  const { id } = useParams();

  // Mock student data - would come from API/database
  const student = {
    id: "STD001",
    name: "Chioma Adeyemi",
    phone: "+234 801 234 5678",
    class: "SS3",
    status: "active",
    joinedDate: "Jan 15, 2025",
    avgScore: 85,
    examsCompleted: 12,
    totalExams: 15,
    rank: 3,
    totalStudents: 1234,
    profileImage: null,
  };

  const examHistory = [
    {
      id: "EX001",
      title: "JAMB Physics 2025 Mock",
      subject: "Physics",
      date: "Nov 14, 2025",
      score: 88,
      maxScore: 100,
      duration: "2 hours",
      status: "completed",
      questions: 40,
      correctAnswers: 35,
    },
    {
      id: "EX002",
      title: "WAEC Mathematics Practice",
      subject: "Mathematics",
      date: "Nov 10, 2025",
      score: 92,
      maxScore: 100,
      duration: "3 hours",
      status: "completed",
      questions: 50,
      correctAnswers: 46,
    },
    {
      id: "EX003",
      title: "NECO English Language Test",
      subject: "English",
      date: "Nov 5, 2025",
      score: 78,
      maxScore: 100,
      duration: "2 hours",
      status: "completed",
      questions: 60,
      correctAnswers: 47,
    },
    {
      id: "EX004",
      title: "Chemistry Practical Mock",
      subject: "Chemistry",
      date: "Oct 28, 2025",
      score: 85,
      maxScore: 100,
      duration: "2.5 hours",
      status: "completed",
      questions: 45,
      correctAnswers: 38,
    },
  ];

  const subjectPerformance = [
    { subject: "Mathematics", avgScore: 92, exams: 4, trend: "up" },
    { subject: "Physics", avgScore: 88, exams: 3, trend: "up" },
    { subject: "Chemistry", avgScore: 85, exams: 3, trend: "stable" },
    { subject: "English", avgScore: 78, exams: 2, trend: "down" },
  ];

  const stats = [
    {
      label: "Overall Score",
      value: `${student.avgScore}%`,
      icon: Target,
      color: "from-primary to-primary-dark",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      label: "Class Rank",
      value: `#${student.rank}`,
      icon: Award,
      color: "from-warning to-warning",
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
    {
      label: "Completed",
      value: `${student.examsCompleted}/${student.totalExams}`,
      icon: CheckCircle2,
      color: "from-success to-success",
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      label: "Completion Rate",
      value: `${Math.round((student.examsCompleted / student.totalExams) * 100)}%`,
      icon: Zap,
      color: "from-secondary to-secondary-dark",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-error";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-success/10";
    if (score >= 60) return "bg-warning/10";
    return "bg-error/10";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link to="/admin/students">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Students
          </Button>
        </Link>

        {/* Student Header Card */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-strong text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl sm:text-4xl font-bold">
              {student.name.charAt(0)}
            </div>

            {/* Student Info */}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                {student.name}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm sm:text-base text-white/90">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {student.class}
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {student.phone}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined {student.joinedDate}
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="self-start">
              <span className="px-4 py-2 bg-success/20 text-white rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
              </span>
            </div>
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
                  <p className="text-2xl sm:text-3xl font-bold text-spiritual-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.iconBg} rounded-xl p-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Exam History */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-soft border border-white/20">
            <h2 className="text-lg sm:text-xl font-bold text-spiritual-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Exam History
            </h2>

            <div className="space-y-4">
              {examHistory.map((exam) => (
                <div
                  key={exam.id}
                  className="border border-spiritual-200 rounded-xl p-4 hover:border-primary/50 hover:shadow-medium transition-all duration-300"
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
                          <Calendar className="w-4 h-4" />
                          {exam.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {exam.duration}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreBg(
                        exam.score
                      )} ${getScoreColor(exam.score)}`}
                    >
                      {exam.score}/{exam.maxScore}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-spiritual-200">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-spiritual-600">
                        {exam.correctAnswers}/{exam.questions} correct
                      </span>
                      <span className={`font-medium ${getScoreColor(exam.score)}`}>
                        {exam.score}%
                      </span>
                    </div>
                    <Progress
                      value={exam.score}
                      className="mt-2 h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Performance */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-soft border border-white/20">
            <h2 className="text-lg sm:text-xl font-bold text-spiritual-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Subject Performance
            </h2>

            <div className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-spiritual-900">
                      {subject.subject}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-spiritual-600">
                        {subject.exams} exams
                      </span>
                      <TrendingUp
                        className={`w-4 h-4 ${
                          subject.trend === "up"
                            ? "text-success"
                            : subject.trend === "down"
                            ? "text-error"
                            : "text-spiritual-400"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress
                      value={subject.avgScore}
                      className="flex-1 h-2"
                    />
                    <span
                      className={`text-sm font-semibold min-w-[3rem] text-right ${getScoreColor(
                        subject.avgScore
                      )}`}
                    >
                      {subject.avgScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Progress */}
            <div className="mt-6 pt-6 border-t border-spiritual-200">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                <p className="text-xs text-spiritual-600 mb-1">Overall Progress</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {student.avgScore}%
                </p>
                <p className="text-xs text-spiritual-600 mt-1">
                  Rank #{student.rank} of {student.totalStudents}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StudentDetail;
