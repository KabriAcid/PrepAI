import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Download,
  Upload,
  Filter,
  MoreVertical,
  Phone,
  UserCheck,
  UserX,
  Eye,
  X,
  Edit,
  Trash2,
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId && dropdownRefs.current[openDropdownId]) {
        if (!dropdownRefs.current[openDropdownId]?.contains(event.target as Node)) {
          setOpenDropdownId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  const handleStatusChange = (studentId: string, newStatus: string) => {
    console.log(`Changing status for ${studentId} to ${newStatus}`);
    setOpenDropdownId(null);
  };

  const handleDelete = (studentId: string) => {
    console.log(`Deleting student ${studentId}`);
    setOpenDropdownId(null);
  };

  const students = [
    {
      id: "STD001",
      counter: 1,
      name: "Chioma Adeyemi",
      email: "chioma.a@email.com",
      phone: "+234 801 234 5678",
      class: "SS3",
      examsCompleted: 12,
      avgScore: 85,
      status: "active",
      joinedDate: "Jan 15, 2025",
    },
    {
      id: "STD002",
      counter: 2,
      name: "Ibrahim Musa",
      email: "ibrahim.m@email.com",
      phone: "+234 802 345 6789",
      class: "SS3",
      examsCompleted: 15,
      avgScore: 78,
      status: "active",
      joinedDate: "Jan 10, 2025",
    },
    {
      id: "STD003",
      counter: 3,
      name: "Blessing Okoro",
      email: "blessing.o@email.com",
      phone: "+234 803 456 7890",
      class: "SS2",
      examsCompleted: 8,
      avgScore: 92,
      status: "active",
      joinedDate: "Feb 5, 2025",
    },
    {
      id: "STD004",
      counter: 4,
      name: "Emeka Okafor",
      email: "emeka.o@email.com",
      phone: "+234 804 567 8901",
      class: "SS3",
      examsCompleted: 10,
      avgScore: 71,
      status: "suspended",
      joinedDate: "Dec 20, 2024",
    },
    {
      id: "STD005",
      counter: 5,
      name: "Fatima Hassan",
      email: "fatima.h@email.com",
      phone: "+234 805 678 9012",
      class: "SS2",
      examsCompleted: 14,
      avgScore: 88,
      status: "active",
      joinedDate: "Jan 8, 2025",
    },
  ];

  const stats = [
    { 
      label: "Total Students", 
      value: "1,234", 
      gradient: "from-primary-500 to-primary-600",
      textColor: "text-primary",
      bgColor: "bg-primary/10"
    },
    { 
      label: "Active", 
      value: "1,189", 
      gradient: "from-success-500 to-success-600",
      textColor: "text-success",
      bgColor: "bg-success/10"
    },
    { 
      label: "New This Month", 
      value: "45", 
      gradient: "from-secondary-500 to-secondary-600",
      textColor: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    { 
      label: "Suspended", 
      value: "12", 
      gradient: "from-warning to-warning",
      textColor: "text-warning",
      bgColor: "bg-warning/10"
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-spiritual-900">
              Student Management
            </h1>
            <p className="text-sm text-spiritual-600 mt-1">
              Manage and monitor all registered students
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-spiritual-300 hover:bg-spiritual-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import CSV
                </Button>
              </DialogTrigger>
            </Dialog>
            <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft hover:shadow-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-spiritual-900">
                    Add New Student
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-5 py-4">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-spiritual-900 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-primary" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter first name"
                          className="border-spiritual-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter last name"
                          className="border-spiritual-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-spiritual-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          placeholder="+234 XXX XXX XXXX"
                          className="border-spiritual-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guardianPhone">Guardian Phone</Label>
                        <Input
                          id="guardianPhone"
                          placeholder="+234 XXX XXX XXXX"
                          className="border-spiritual-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-spiritual-900">
                      Academic Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="class">Class *</Label>
                        <Select>
                          <SelectTrigger className="border-spiritual-200">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ss1">SS1</SelectItem>
                            <SelectItem value="ss2">SS2</SelectItem>
                            <SelectItem value="ss3">SS3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          placeholder="Auto-generated"
                          disabled
                          className="border-spiritual-200 bg-spiritual-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-spiritual-900">
                      Additional Information
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address (Optional)</Label>
                      <Input
                        id="address"
                        placeholder="Enter home address"
                        className="border-spiritual-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-spiritual-200">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddStudent(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                    onClick={() => setShowAddStudent(false)}
                  >
                    Add Student
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20 hover:shadow-medium transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-spiritual-600 mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} rounded-xl p-3`}>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.gradient}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-spiritual-400" />
              <Input
                placeholder="Search by name, email, or ID..."
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

        {/* Students Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-spiritual-50 border-b border-spiritual-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-spiritual-700 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-spiritual-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-spiritual-700 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-spiritual-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-spiritual-700 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-spiritual-700 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-spiritual-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-spiritual-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-spiritual-200">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-spiritual-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-spiritual-600">
                        {student.counter}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-primary">
                        {student.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-spiritual-900">
                        {student.name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-spiritual-700 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {student.phone}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-spiritual-900">
                        {student.class}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-spiritual-900">
                          {student.examsCompleted} exams
                        </p>
                        <p className="text-sm text-spiritual-600">
                          Avg: {student.avgScore}%
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.status === "active"
                            ? "bg-success-light text-success"
                            : student.status === "suspended"
                            ? "bg-warning-light text-warning"
                            : "bg-spiritual-100 text-spiritual-600"
                        }`}
                      >
                        {student.status === "active" ? (
                          <UserCheck className="w-3 h-3" />
                        ) : (
                          <UserX className="w-3 h-3" />
                        )}
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/students/${student.id}`}>
                          <button className="p-1.5 rounded-lg hover:bg-spiritual-100 transition-colors">
                            <Eye className="w-4 h-4 text-spiritual-600 hover:text-primary" />
                          </button>
                        </Link>
                        <div className="relative" ref={(el) => (dropdownRefs.current[student.id] = el)}>
                          <button
                            onClick={() => setOpenDropdownId(openDropdownId === student.id ? null : student.id)}
                            className="p-1.5 rounded-lg hover:bg-spiritual-100 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-spiritual-600" />
                          </button>

                          {openDropdownId === student.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-strong border border-spiritual-200 py-2 z-50">
                              <div className="px-3 py-1.5 text-xs font-semibold text-spiritual-600 uppercase">
                                Change Status
                              </div>
                              <button
                                onClick={() => handleStatusChange(student.id, 'active')}
                                className="w-full px-4 py-2 text-left text-sm text-spiritual-700 hover:bg-spiritual-50 transition-colors flex items-center gap-2"
                              >
                                <UserCheck className="w-4 h-4 text-success" />
                                Active
                              </button>
                              <button
                                onClick={() => handleStatusChange(student.id, 'suspended')}
                                className="w-full px-4 py-2 text-left text-sm text-spiritual-700 hover:bg-spiritual-50 transition-colors flex items-center gap-2"
                              >
                                <UserX className="w-4 h-4 text-warning" />
                                Suspended
                              </button>
                              <button
                                onClick={() => handleStatusChange(student.id, 'inactive')}
                                className="w-full px-4 py-2 text-left text-sm text-spiritual-700 hover:bg-spiritual-50 transition-colors flex items-center gap-2"
                              >
                                <UserX className="w-4 h-4 text-spiritual-600" />
                                Inactive
                              </button>
                              <hr className="my-2 border-spiritual-200" />
                              <button
                                className="w-full px-4 py-2 text-left text-sm text-spiritual-700 hover:bg-spiritual-50 transition-colors flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4 text-primary" />
                                Edit Student
                              </button>
                              <button
                                onClick={() => handleDelete(student.id)}
                                className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error-light transition-colors flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Student
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-spiritual-200">
            <p className="text-sm text-spiritual-600">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">5</span> of{" "}
              <span className="font-medium">1,234</span> results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Students;
