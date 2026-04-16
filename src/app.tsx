import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from '@/pages/Home';
import Leaderboard from '@/pages/Leaderboard';
import Login from '@/pages/Login';
import Quiz from '@/pages/Quiz';
import Register from '@/pages/Register';
import AdminDashboard from '@/pages/school-admin/Dashboard';
import AdminExams from '@/pages/school-admin/Exams';
import AdminNotifications from '@/pages/school-admin/Notifications';
import AdminPerformance from '@/pages/school-admin/Performance';
import AdminQuestions from '@/pages/school-admin/Questions';
import AdminResults from '@/pages/school-admin/Results';
import AdminSettings from '@/pages/school-admin/Settings';
import AdminStudentDetail from '@/pages/school-admin/StudentDetail';
import AdminStudents from '@/pages/school-admin/Students';
import AdminSubjects from '@/pages/school-admin/Subjects';
import AdminSupport from '@/pages/school-admin/Support';
import Dashboard from '@/pages/students/Dashboard';
import Help from '@/pages/students/Help';
import Performance from '@/pages/students/Performance';
import PracticeTests from '@/pages/students/PracticeTests';
import Results from '@/pages/students/Results';
import Settings from '@/pages/students/Settings';
import Subjects from '@/pages/students/Subjects';

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={<Navigate to="/student/dashboard" replace />}
                />
                <Route
                    path="/exams"
                    element={<Navigate to="/student/exams" replace />}
                />
                <Route
                    path="/admin/dashboard"
                    element={<Navigate to="/admin" replace />}
                />

                <Route path="/student/dashboard" element={<Dashboard />} />
                <Route path="/student/exams" element={<PracticeTests />} />
                <Route path="/student/quiz" element={<Quiz />} />
                <Route path="/student/results" element={<Results />} />
                <Route path="/student/performance" element={<Performance />} />
                <Route path="/student/subjects" element={<Subjects />} />
                <Route path="/student/settings" element={<Settings />} />
                <Route path="/student/help" element={<Help />} />

                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/students" element={<AdminStudents />} />
                <Route path="/admin/students/:id" element={<AdminStudentDetail />} />
                <Route path="/admin/exams" element={<AdminExams />} />
                <Route path="/admin/questions" element={<AdminQuestions />} />
                <Route path="/admin/results" element={<AdminResults />} />
                <Route path="/admin/performance" element={<AdminPerformance />} />
                <Route path="/admin/subjects" element={<AdminSubjects />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/support" element={<AdminSupport />} />
                <Route path="/admin/notifications" element={<AdminNotifications />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster position="top-right" richColors />
        </>
    );
};

export default App;
