import { motion } from 'framer-motion';
import {
    ArrowRight,
    BadgeCheck,
    BookOpen,
    Clock,
    Play,
    Star,
    Trophy,
    Users,
} from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

interface Exam {
    id: number;
    title: string;
    subject: string;
    description: string;
    timeLimit: number;
    difficulty: 'easy' | 'medium' | 'hard';
    totalPoints: number;
    questions: number;
    emoji: string;
}

const Home: React.FC = () => {
    const navigate = useNavigate();

    // Mock exam data for featured tests
    const featuredExams: Exam[] = [
        {
            id: 1,
            title: 'JAMB Mathematics',
            subject: 'Mathematics',
            description:
                'Comprehensive practice test covering all JAMB mathematics topics',
            timeLimit: 120,
            difficulty: 'medium',
            totalPoints: 400,
            questions: 40,
            emoji: '🧮',
        },
        {
            id: 2,
            title: 'WAEC English Language',
            subject: 'English',
            description:
                'Master WAEC English comprehension, grammar, and oral English',
            timeLimit: 180,
            difficulty: 'easy',
            totalPoints: 500,
            questions: 50,
            emoji: '📚',
        },
        {
            id: 3,
            title: 'JAMB Chemistry',
            subject: 'Chemistry',
            description:
                'Practice organic, inorganic, and physical chemistry questions',
            timeLimit: 120,
            difficulty: 'hard',
            totalPoints: 400,
            questions: 40,
            emoji: '⚗️',
        },
    ];

    const stats = [
        {
            icon: Users,
            label: 'Active Students',
            value: '10,000+',
            color: 'text-primary-600',
        },
        {
            icon: BookOpen,
            label: 'Practice Questions',
            value: '50,000+',
            color: 'text-secondary-600',
        },
        {
            icon: BadgeCheck,
            label: 'Tests Completed',
            value: '100,000+',
            color: 'text-success-600',
        },
        {
            icon: Star,
            label: 'Success Rate',
            value: '92%',
            color: 'text-warning-600',
        },
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'bg-success-100 text-success-600';
            case 'medium':
                return 'bg-warning-100 text-warning-600';
            case 'hard':
                return 'bg-error-100 text-error-600';
            default:
                return 'bg-neutral-100 text-neutral-600';
        }
    };

    const handleStartExam = (exam: Exam) => {
        navigate('/student/quiz', { state: { examId: exam.id } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Navigation */}
            <nav className="fixed left-0 right-0 top-0 z-50 bg-white/90 shadow-soft backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Logo size="md" />

                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-spiritual-600 transition-colors hover:text-primary-600"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="btn-primary hidden text-sm sm:inline-flex"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
                <div className="islamic-bg absolute inset-0 opacity-30" />

                <div className="relative mx-auto max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* Hero Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
                                🎯 AI-Powered Exam Preparation
                            </div>

                            <h1 className="text-5xl font-bold leading-tight text-spiritual-900 md:text-6xl">
                                Study with confidence.
                                <span className="text-gradient block">
                                    Perform at your best.
                                </span>
                            </h1>

                            <p className="max-w-3xl text-lg leading-relaxed text-spiritual-600">
                                Ace your JAMB, WAEC, and NECO exams with
                                AI-powered practice tests, compete with peers,
                                and track your academic progress in real-time.
                            </p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="flex flex-col items-center justify-start gap-4 sm:flex-row"
                            >
                                <Link
                                    to="/register?role=student"
                                    className="btn-primary group inline-flex items-center text-base"
                                >
                                    <Play className="mr-2 h-5 w-5" />
                                    Start Learning
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    to="/leaderboard"
                                    className="inline-flex items-center rounded-xl border border-spiritual-200 bg-white px-6 py-3 text-base font-medium text-spiritual-700 shadow-soft transition-all duration-300 hover:border-spiritual-300 hover:shadow-medium"
                                >
                                    <Trophy className="mr-2 h-5 w-5" />
                                    View Leaderboard
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Hero Illustration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="relative mt-16 hidden lg:block"
                        >
                            <div className="mx-auto w-full max-w-md">
                                <div className="relative rounded-3xl bg-white/90 p-8 shadow-strong backdrop-blur-sm">
                                    <div className="space-y-4 text-center">
                                        <div className="mx-auto flex h-20 w-20 animate-bounce-gentle items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500">
                                            <BookOpen className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-spiritual-900">
                                            Ready to Begin?
                                        </h3>
                                        <p className="text-spiritual-600">
                                            Choose from thousands of exam
                                            questions across all subjects
                                        </p>
                                        <div className="flex items-center justify-center space-x-2 text-sm text-spiritual-500">
                                            <Star className="h-4 w-4 text-warning-500" />
                                            <span>
                                                Trusted by 10,000+ students
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white/50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                className="space-y-2 text-center"
                            >
                                <div
                                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 ${stat.color}`}
                                >
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div className="text-2xl font-bold text-spiritual-900">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-spiritual-600">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Exams Section */}
            <section id="featured-exams" className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center"
                    >
                        <h2 className="mb-4 text-4xl font-bold text-spiritual-900">
                            Featured Mock Exams
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-spiritual-600">
                            Start your preparation with these carefully designed
                            mock tests based on past JAMB, WAEC, and NECO
                            questions.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuredExams.map((exam, index) => (
                            <motion.div
                                key={exam.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                className={`card-hover rounded-2xl border border-white/20 bg-white/90 p-6 shadow-soft backdrop-blur-sm`}
                            >
                                {/* Card Header */}
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="text-4xl">{exam.emoji}</div>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}
                                    >
                                        {exam.difficulty
                                            .charAt(0)
                                            .toUpperCase() +
                                            exam.difficulty.slice(1)}
                                    </span>
                                </div>

                                {/* Card Content */}
                                <h3 className="mb-2 text-lg font-bold text-spiritual-900 md:text-xl">
                                    {exam.title}
                                </h3>
                                <p className="mb-4 text-sm leading-relaxed text-spiritual-600">
                                    {exam.description}
                                </p>

                                {/* Card Meta */}
                                <div className="mb-4 flex items-center justify-between gap-2 text-sm text-spiritual-500">
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{exam.timeLimit}m</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Star className="h-4 w-4" />
                                        <span>{exam.totalPoints} pts</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Users className="h-4 w-4" />
                                        <span>{exam.questions}</span>
                                    </div>
                                </div>

                                {/* Start Button */}
                                <button
                                    onClick={() => handleStartExam(exam)}
                                    className="btn-primary group inline-flex w-full items-center justify-center text-sm"
                                >
                                    <span>Start Exam</span>
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <Link
                            to="/student/exams"
                            className="inline-flex items-center rounded-xl border border-spiritual-200 bg-white px-6 py-3 text-base font-medium text-spiritual-700 shadow-soft transition-all duration-300 hover:border-spiritual-300 hover:shadow-medium"
                        >
                            <span>View All Exams</span>
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-4xl font-bold text-white">
                            Ready to Ace Your Exams?
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl text-primary-100">
                            Join thousands of Nigerian students preparing for
                            JAMB, WAEC, and NECO with our AI-powered mock tests.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
                            <Link
                                to="/register"
                                className="inline-flex items-center rounded-xl bg-white px-6 py-3 text-base font-medium text-primary-600 shadow-medium transition-all duration-300 hover:scale-105 hover:bg-primary-50 hover:shadow-strong active:scale-95"
                            >
                                <Play className="mr-2 h-5 w-5" />
                                Start Your First Test
                            </Link>
                            <a
                                href="#featured-exams"
                                className="inline-flex items-center rounded-xl border-2 border-white px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-white/20"
                            >
                                Learn More
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-spiritual-900 py-12 text-spiritual-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
                        {/* Brand */}
                        <div className="col-span-2 space-y-4 md:col-span-1">
                            <Logo size="sm" theme="light" />
                            <p className="text-sm">
                                Your trusted platform for JAMB, WAEC, and NECO
                                exam preparation.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-white">
                                Quick Links
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary-400"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#featured-exams"
                                        className="transition-colors hover:text-primary-400"
                                    >
                                        Exams
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary-400"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary-400"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-white">
                                Resources
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary-400"
                                    >
                                        Study Guides
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary-400"
                                    >
                                        Past Questions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary-400"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary-400"
                                    >
                                        FAQs
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-white">
                                Legal
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary-400"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary-400"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary-400"
                                    >
                                        Cookie Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-spiritual-700 pt-8 text-center text-sm">
                        <p>
                            &copy; {new Date().getFullYear()} Skool. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
