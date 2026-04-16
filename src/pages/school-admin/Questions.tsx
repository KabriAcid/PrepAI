import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  BookOpen,
  CheckCircle,
  Circle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Questions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const subjects = [
    { name: "All", count: 2450 },
    { name: "Mathematics", count: 456 },
    { name: "English", count: 523 },
    { name: "Physics", count: 387 },
    { name: "Chemistry", count: 342 },
    { name: "Biology", count: 398 },
    { name: "Economics", count: 344 },
  ];

  const questions = [
    {
      id: "Q001",
      subject: "Physics",
      topic: "Mechanics",
      question: "What is Newton's first law of motion?",
      type: "Multiple Choice",
      difficulty: "Easy",
      options: 4,
      correctAnswer: "A",
      usageCount: 45,
      avgScore: 78,
    },
    {
      id: "Q002",
      subject: "Chemistry",
      topic: "Organic Chemistry",
      question: "Which of the following is an alkane?",
      type: "Multiple Choice",
      difficulty: "Medium",
      options: 4,
      correctAnswer: "B",
      usageCount: 67,
      avgScore: 65,
    },
    {
      id: "Q003",
      subject: "Biology",
      topic: "Cell Biology",
      question: "Explain the process of photosynthesis",
      type: "Essay",
      difficulty: "Hard",
      options: 0,
      correctAnswer: "N/A",
      usageCount: 23,
      avgScore: 71,
    },
    {
      id: "Q004",
      subject: "Mathematics",
      topic: "Algebra",
      question: "Solve for x: 2x + 5 = 15",
      type: "Single Answer",
      difficulty: "Easy",
      options: 1,
      correctAnswer: "5",
      usageCount: 89,
      avgScore: 82,
    },
    {
      id: "Q005",
      subject: "English",
      topic: "Grammar",
      question: "Identify the correct tense in the sentence",
      type: "Multiple Choice",
      difficulty: "Medium",
      options: 4,
      correctAnswer: "C",
      usageCount: 56,
      avgScore: 73,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Easy: "bg-success-light text-success",
      Medium: "bg-warning-light text-warning",
      Hard: "bg-error-light text-error",
    };
    return colors[difficulty as keyof typeof colors] || colors.Easy;
  };

  const stats = [
    { label: "Total Questions", value: "2,450" },
    { label: "This Month", value: "+120" },
    { label: "Avg Difficulty", value: "Medium" },
    { label: "Avg Score", value: "74%" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-spiritual-900">
              Question Bank
            </h1>
            <p className="text-sm text-spiritual-600 mt-1">
              Manage your examination question database
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-primary-dark text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export as PDF
            </Button>
          </div>
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

        {/* Subject Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20">
          <h3 className="text-sm font-semibold text-spiritual-900 mb-3">
            Filter by Subject
          </h3>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <button
                key={subject.name}
                onClick={() => setSelectedSubject(subject.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedSubject === subject.name
                    ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-medium"
                    : "bg-spiritual-100 text-spiritual-700 hover:bg-spiritual-200"
                }`}
              >
                {subject.name}
                <span className="ml-2 text-xs opacity-75">({subject.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Actions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-spiritual-400" />
              <Input
                placeholder="Search questions by topic, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20 hover:shadow-medium transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-spiritual-600">
                      {question.id}
                    </span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                      {question.subject}
                    </span>
                    <span className="text-xs text-spiritual-600">
                      {question.topic}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded ${getDifficultyColor(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                  <p className="text-spiritual-900 font-medium mb-2">
                    {question.question}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-spiritual-600">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {question.type}
                    </span>
                    {question.options > 0 && (
                      <span>{question.options} options</span>
                    )}
                    <span>Used {question.usageCount} times</span>
                    <span>Avg Score: {question.avgScore}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 text-error" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Questions;
