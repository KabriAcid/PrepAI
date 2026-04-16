import { motion } from 'framer-motion';
import { ArrowLeft, Award, BookOpen, Medal, Star, Trophy, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

interface LeaderboardEntry {
    rank: number;
    name: string;
    school: string;
    examsTaken: number;
    averageScore: number;
    streak: number;
}

const leaderboardData: LeaderboardEntry[] = [
    {
        rank: 1,
        name: 'Amina Hassan',
        school: 'Queens College, Lagos',
        examsTaken: 28,
        averageScore: 96,
        streak: 14,
    },
    {
        rank: 2,
        name: 'David Okonkwo',
        school: 'Federal Government College, Enugu',
        examsTaken: 26,
        averageScore: 94,
        streak: 10,
    },
    {
        rank: 3,
        name: 'Fatima Bello',
        school: 'FGGC Bauchi',
        examsTaken: 25,
        averageScore: 92,
        streak: 11,
    },
    {
        rank: 4,
        name: 'Chukwuemeka Obi',
        school: 'King\'s College, Lagos',
        examsTaken: 24,
        averageScore: 90,
        streak: 8,
    },
    {
        rank: 5,
        name: 'Blessing Adeyemi',
        school: 'Loyola Jesuit College, Abuja',
        examsTaken: 23,
        averageScore: 89,
        streak: 7,
    },
    {
        rank: 6,
        name: 'Ibrahim Yusuf',
        school: 'Government Science Secondary School, Kano',
        examsTaken: 22,
        averageScore: 88,
        streak: 9,
    },
    {
        rank: 7,
        name: 'Zainab Ahmad',
        school: 'Ahmadiyya College, Lagos',
        examsTaken: 22,
        averageScore: 87,
        streak: 6,
    },
    {
        rank: 8,
        name: 'Mary Nwosu',
        school: 'Holy Child College, Ikoyi',
        examsTaken: 21,
        averageScore: 86,
        streak: 7,
    },
];

const topThree = leaderboardData.slice(0, 3);

const Leaderboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <nav className="sticky left-0 right-0 top-0 z-40 border-b border-white/60 bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Logo size="md" />
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="inline-flex items-center rounded-xl border border-spiritual-200 bg-white px-4 py-2 text-sm font-medium text-spiritual-700 transition-all hover:border-primary-300 hover:text-primary-700"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                        <Link to="/register" className="btn-primary hidden text-sm sm:inline-flex">
                            Join Leaderboard
                        </Link>
                    </div>
                </div>
            </nav>

            <section className="relative overflow-hidden px-4 pb-10 pt-12 sm:px-6 lg:px-8">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-primary-200 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-secondary-200 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="rounded-3xl bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white shadow-strong sm:p-8"
                    >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="mb-2 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                                    <Trophy className="mr-2 h-3.5 w-3.5" />
                                    National Student Leaderboard
                                </p>
                                <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                                    Celebrate consistent effort.
                                </h1>
                                <p className="mt-3 max-w-2xl text-primary-100">
                                    See how top students are performing across practice exams and use their momentum to inspire your own study streak.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="rounded-xl bg-white/15 p-3 backdrop-blur-sm">
                                    <p className="text-primary-100">Active Competitors</p>
                                    <p className="mt-1 text-xl font-semibold text-white">10,000+</p>
                                </div>
                                <div className="rounded-xl bg-white/15 p-3 backdrop-blur-sm">
                                    <p className="text-primary-100">Weekly Attempts</p>
                                    <p className="mt-1 text-xl font-semibold text-white">42,500</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="px-4 pb-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
                    {topThree.map((student, index) => (
                        <motion.div
                            key={student.rank}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-soft backdrop-blur-sm"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                                    Rank #{student.rank}
                                </span>
                                {student.rank === 1 ? (
                                    <Trophy className="h-5 w-5 text-warning-500" />
                                ) : (
                                    <Medal className="h-5 w-5 text-spiritual-500" />
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-spiritual-900">{student.name}</h2>
                            <p className="mt-1 text-sm text-spiritual-600">{student.school}</p>
                            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                                <div className="rounded-lg bg-spiritual-50 p-2">
                                    <BookOpen className="mx-auto mb-1 h-4 w-4 text-primary-600" />
                                    <p className="font-semibold text-spiritual-900">{student.examsTaken}</p>
                                    <p className="text-spiritual-500">Exams</p>
                                </div>
                                <div className="rounded-lg bg-spiritual-50 p-2">
                                    <Star className="mx-auto mb-1 h-4 w-4 text-warning-500" />
                                    <p className="font-semibold text-spiritual-900">{student.averageScore}%</p>
                                    <p className="text-spiritual-500">Average</p>
                                </div>
                                <div className="rounded-lg bg-spiritual-50 p-2">
                                    <Award className="mx-auto mb-1 h-4 w-4 text-success-600" />
                                    <p className="font-semibold text-spiritual-900">{student.streak}</p>
                                    <p className="text-spiritual-500">Streak</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mx-auto mt-8 max-w-7xl overflow-hidden rounded-2xl border border-spiritual-200 bg-white shadow-soft"
                >
                    <div className="flex items-center justify-between border-b border-spiritual-100 px-5 py-4">
                        <h3 className="text-lg font-bold text-spiritual-900">Top Performers This Week</h3>
                        <span className="inline-flex items-center text-sm text-spiritual-600">
                            <Users className="mr-1 h-4 w-4" />
                            Updated daily
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead className="bg-spiritual-50 text-xs uppercase tracking-wide text-spiritual-600">
                                <tr>
                                    <th className="px-5 py-3 font-semibold">Rank</th>
                                    <th className="px-5 py-3 font-semibold">Student</th>
                                    <th className="px-5 py-3 font-semibold">School</th>
                                    <th className="px-5 py-3 font-semibold">Exams</th>
                                    <th className="px-5 py-3 font-semibold">Average Score</th>
                                    <th className="px-5 py-3 font-semibold">Current Streak</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.map((student) => (
                                    <tr
                                        key={student.rank}
                                        className="border-t border-spiritual-100 text-sm text-spiritual-700 transition-colors hover:bg-spiritual-50/70"
                                    >
                                        <td className="px-5 py-4 font-semibold text-spiritual-900">#{student.rank}</td>
                                        <td className="px-5 py-4 font-medium text-spiritual-900">{student.name}</td>
                                        <td className="px-5 py-4">{student.school}</td>
                                        <td className="px-5 py-4">{student.examsTaken}</td>
                                        <td className="px-5 py-4">
                                            <span className="rounded-full bg-success-100 px-2 py-1 text-xs font-semibold text-success-700">
                                                {student.averageScore}%
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">{student.streak} days</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Leaderboard;