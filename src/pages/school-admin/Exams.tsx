import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  FileText,
  Settings,
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

const Exams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  const exams = [
    {
      id: "EXM001",
      title: "JAMB Physics 2025 Mock",
      type: "JAMB",
      subject: "Physics",
      date: "Nov 17, 2025",
      time: "10:08 AM",
      duration: 120,
      questions: 40,
      enrolled: 145,
      completed: 0,
      status: "scheduled",
    },
    {
      id: "EXM002",
      title: "WAEC Mathematics Practice",
      type: "WAEC",
      subject: "Mathematics",
      date: "Nov 20, 2025",
      time: "09:00 AM",
      duration: 180,
      questions: 50,
      enrolled: 198,
      completed: 0,
      status: "scheduled",
    },
    {
      id: "EXM003",
      title: "NECO Chemistry Test",
      type: "NECO",
      subject: "Chemistry",
      date: "Nov 10, 2025",
      time: "11:00 AM",
      duration: 120,
      questions: 40,
      enrolled: 156,
      completed: 156,
      status: "completed",
    },
    {
      id: "EXM004",
      title: "Internal Biology Assessment",
      type: "Internal",
      subject: "Biology",
      date: "Nov 12, 2025",
      time: "02:00 PM",
      duration: 90,
      questions: 30,
      enrolled: 210,
      completed: 203,
      status: "completed",
    },
    {
      id: "EXM005",
      title: "JAMB English Language Mock",
      type: "JAMB",
      subject: "English",
      date: "Nov 15, 2025",
      time: "09:00 AM",
      duration: 120,
      questions: 60,
      enrolled: 189,
      completed: 145,
      status: "active",
    },
  ];

  const stats = [
    { label: "Total Exams", value: "48", color: "text-primary" },
    { label: "Active", value: "8", color: "text-success" },
    { label: "Scheduled", value: "12", color: "text-secondary" },
    { label: "Completed", value: "28", color: "text-spiritual-600" },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      scheduled: "bg-secondary-light text-secondary",
      active: "bg-success-light text-success",
      completed: "bg-spiritual-100 text-spiritual-600",
      cancelled: "bg-error-light text-error",
    };
    return styles[status as keyof typeof styles] || styles.scheduled;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-spiritual-900">
              Exams Management
            </h1>
            <p className="text-sm text-spiritual-600 mt-1">
              Create, schedule, and manage all examinations
            </p>
          </div>
          <Dialog open={showCreateWizard} onOpenChange={setShowCreateWizard}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-soft hover:shadow-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Exam - Step {wizardStep} of 4</DialogTitle>
              </DialogHeader>

              {/* Wizard Steps */}
              <div className="space-y-6">
                {/* Step Indicator */}
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                          step <= wizardStep
                            ? "bg-gradient-to-r from-primary to-primary-dark text-white"
                            : "bg-spiritual-200 text-spiritual-600"
                        }`}
                      >
                        {step}
                      </div>
                      {step < 4 && (
                        <div
                          className={`flex-1 h-1 mx-2 ${
                            step < wizardStep ? "bg-primary" : "bg-spiritual-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Basic Info */}
                {wizardStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        Exam Title
                      </label>
                      <Input placeholder="e.g., JAMB Physics 2025 Mock" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-spiritual-900 mb-2">
                          Exam Type
                        </label>
                        <select className="w-full px-3 py-2 border border-spiritual-300 rounded-lg focus:ring-2 focus:ring-primary">
                          <option>JAMB</option>
                          <option>WAEC</option>
                          <option>NECO</option>
                          <option>Internal</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-spiritual-900 mb-2">
                          Duration (minutes)
                        </label>
                        <Input type="number" placeholder="120" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-spiritual-900 mb-2">
                          Exam Date
                        </label>
                        <Input type="date" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-spiritual-900 mb-2">
                          Start Time
                        </label>
                        <Input type="time" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Subjects */}
                {wizardStep === 2 && (
                  <div className="space-y-4">
                    <p className="text-sm text-spiritual-600">
                      Select subjects for this exam
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Mathematics",
                        "English",
                        "Physics",
                        "Chemistry",
                        "Biology",
                        "Economics",
                      ].map((subject) => (
                        <label
                          key={subject}
                          className="flex items-center gap-3 p-4 border border-spiritual-200 rounded-lg hover:border-primary cursor-pointer transition-colors"
                        >
                          <input type="checkbox" className="w-4 h-4" />
                          <span className="font-medium text-spiritual-900">
                            {subject}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Questions Config */}
                {wizardStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        Number of Questions
                      </label>
                      <Input type="number" placeholder="40" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        Question Difficulty Mix
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-spiritual-700">Easy</span>
                          <Input
                            type="number"
                            placeholder="30%"
                            className="w-24"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-spiritual-700">Medium</span>
                          <Input
                            type="number"
                            placeholder="50%"
                            className="w-24"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-spiritual-700">Hard</span>
                          <Input
                            type="number"
                            placeholder="20%"
                            className="w-24"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-spiritual-900 mb-2">
                        Passing Score (%)
                      </label>
                      <Input type="number" placeholder="40" />
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {wizardStep === 4 && (
                  <div className="space-y-4">
                    <div className="bg-spiritual-50 rounded-lg p-4 space-y-3">
                      <h3 className="font-semibold text-spiritual-900">
                        Review Exam Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-spiritual-600">Title:</span>
                          <span className="font-medium">JAMB Physics 2025 Mock</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-spiritual-600">Type:</span>
                          <span className="font-medium">JAMB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-spiritual-600">Duration:</span>
                          <span className="font-medium">120 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-spiritual-600">Questions:</span>
                          <span className="font-medium">40</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-spiritual-600">Subjects:</span>
                          <span className="font-medium">Physics</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() =>
                      wizardStep > 1 ? setWizardStep(wizardStep - 1) : null
                    }
                    disabled={wizardStep === 1}
                  >
                    Previous
                  </Button>
                  {wizardStep < 4 ? (
                    <Button
                      onClick={() => setWizardStep(wizardStep + 1)}
                      className="bg-gradient-to-r from-primary to-primary-dark"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setShowCreateWizard(false);
                        setWizardStep(1);
                      }}
                      className="bg-gradient-to-r from-success to-success"
                    >
                      Create Exam
                    </Button>
                  )}
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
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-spiritual-400" />
              <Input
                placeholder="Search exams..."
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

        {/* Exams List */}
        <div className="grid gap-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20 hover:shadow-medium transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-spiritual-900 mb-1">
                        {exam.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-spiritual-600">
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
                          {exam.duration} mins
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {exam.questions} questions
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        exam.status
                      )}`}
                    >
                      {exam.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-spiritual-600">Enrolled: </span>
                      <span className="font-semibold text-spiritual-900">
                        {exam.enrolled}
                      </span>
                    </div>
                    <div>
                      <span className="text-spiritual-600">Completed: </span>
                      <span className="font-semibold text-spiritual-900">
                        {exam.completed}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-spiritual-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-success to-success h-2 rounded-full"
                          style={{
                            width: `${(exam.completed / exam.enrolled) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary-dark text-white"
                  >
                    View Details
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

export default Exams;
