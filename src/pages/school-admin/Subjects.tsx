import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Subjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddSubject, setShowAddSubject] = useState(false);

  const subjects = [
    {
      id: "SUB001",
      name: "Mathematics",
      shortCode: "MTH",
      questions: 456,
      exams: 24,
      activeStudents: 892,
      avgScore: 78,
      status: "active",
    },
    {
      id: "SUB002",
      name: "English Language",
      shortCode: "ENG",
      questions: 523,
      exams: 28,
      activeStudents: 1023,
      avgScore: 82,
      status: "active",
    },
    {
      id: "SUB003",
      name: "Physics",
      shortCode: "PHY",
      questions: 387,
      exams: 18,
      activeStudents: 654,
      avgScore: 71,
      status: "active",
    },
    {
      id: "SUB004",
      name: "Chemistry",
      shortCode: "CHM",
      questions: 342,
      exams: 16,
      activeStudents: 587,
      avgScore: 69,
      status: "active",
    },
    {
      id: "SUB005",
      name: "Biology",
      shortCode: "BIO",
      questions: 398,
      exams: 19,
      activeStudents: 723,
      avgScore: 76,
      status: "active",
    },
    {
      id: "SUB006",
      name: "Economics",
      shortCode: "ECO",
      questions: 344,
      exams: 14,
      activeStudents: 512,
      avgScore: 74,
      status: "active",
    },
    {
      id: "SUB007",
      name: "Geography",
      shortCode: "GEO",
      questions: 289,
      exams: 12,
      activeStudents: 445,
      avgScore: 72,
      status: "inactive",
    },
    {
      id: "SUB008",
      name: "Government",
      shortCode: "GOV",
      questions: 267,
      exams: 10,
      activeStudents: 389,
      avgScore: 75,
      status: "inactive",
    },
  ];

  const stats = [
    { label: "Total Subjects", value: "8" },
    { label: "Active", value: "6" },
    { label: "Total Questions", value: "3,006" },
    { label: "Total Exams", value: "141" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-spiritual-900">
              Subjects Management
            </h1>
            <p className="text-sm text-spiritual-600 mt-1">
              Manage examination subjects and their configurations
            </p>
          </div>
          <Dialog open={showAddSubject} onOpenChange={setShowAddSubject}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-primary-dark text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Subject</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-spiritual-900 mb-2">
                    Subject Name
                  </label>
                  <Input placeholder="e.g., Mathematics" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spiritual-900 mb-2">
                    Short Code
                  </label>
                  <Input placeholder="e.g., MTH" maxLength={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spiritual-900 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-spiritual-300 rounded-lg h-20"
                    placeholder="Brief description of the subject..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="active" className="w-4 h-4" />
                  <label htmlFor="active" className="text-sm text-spiritual-900">
                    Set as active subject
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddSubject(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-success to-success">
                    Add Subject
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20"
            >
              <p className="text-sm text-spiritual-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-spiritual-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-spiritual-400" />
            <Input
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border transition-all duration-300 ${
                subject.status === "active"
                  ? "border-white/20 hover:shadow-medium"
                  : "border-spiritual-300 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-spiritual-900">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-spiritual-600">
                      Code: {subject.shortCode}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    subject.status === "active"
                      ? "bg-success-light text-success"
                      : "bg-spiritual-100 text-spiritual-600"
                  }`}
                >
                  {subject.status === "active" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  {subject.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-spiritual-50 rounded-lg p-3">
                  <p className="text-xs text-spiritual-600 mb-1">Questions</p>
                  <p className="text-xl font-bold text-spiritual-900">
                    {subject.questions}
                  </p>
                </div>
                <div className="bg-spiritual-50 rounded-lg p-3">
                  <p className="text-xs text-spiritual-600 mb-1">Exams</p>
                  <p className="text-xl font-bold text-spiritual-900">
                    {subject.exams}
                  </p>
                </div>
                <div className="bg-spiritual-50 rounded-lg p-3">
                  <p className="text-xs text-spiritual-600 mb-1">Students</p>
                  <p className="text-xl font-bold text-spiritual-900">
                    {subject.activeStudents}
                  </p>
                </div>
                <div className="bg-spiritual-50 rounded-lg p-3">
                  <p className="text-xs text-spiritual-600 mb-1">Avg Score</p>
                  <p className="text-xl font-bold text-spiritual-900">
                    {subject.avgScore}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex-1 ${
                    subject.status === "active"
                      ? "hover:bg-error-light hover:text-error hover:border-error"
                      : "hover:bg-success-light hover:text-success hover:border-success"
                  }`}
                >
                  {subject.status === "active" ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Subjects;
