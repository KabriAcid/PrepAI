import React, { useMemo, useState } from 'react';
import {
    BarChart3,
    Calendar,
    CheckCircle,
    Clock,
    Search,
    Trophy,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Input from '@/components/ui/input';
import ProgressBar from '@/components/ui/ProgressBar';
import { useQuiz } from '@/context/QuizContext';

type ResultStatus = 'passed' | 'failed';

type ResultItem = {
    id: string;
    exam: string;
    date: Date;
    scorePercent: number;
    answered: number;
    totalQuestions: number;
    correctAnswers: number;
    timeSpentSeconds: number;
    status: ResultStatus;
    source: 'latest' | 'history';
};

const PASS_MARK = 70;

const formatDuration = (seconds: number): string => {
    const mins = Math.floor(Math.max(seconds, 0) / 60);
    const secs = Math.max(seconds, 0) % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
};

const formatResultDate = (date: Date): string =>
    date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

const Results: React.FC = () => {
    const navigate = useNavigate();
    const { currentQuiz, answers, isCompleted, timeRemaining } = useQuiz();

    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'date' | 'score'>('date');

    const latestResult = useMemo<ResultItem | null>(() => {
        if (!currentQuiz || !isCompleted) return null;

        const totalQuestions = currentQuiz.questions.length;
        const answered = Object.keys(answers).length;
        const correctAnswers = currentQuiz.questions.reduce((count, question) => {
            return answers[question.id] === question.correctAnswer ? count + 1 : count;
        }, 0);

        const scorePercent = totalQuestions
            ? Math.round((correctAnswers / totalQuestions) * 100)
            : 0;

        const timeSpentSeconds = Math.max(
            0,
            (currentQuiz.timeLimit ?? 0) - Math.max(timeRemaining, 0),
        );

        return {
            id: `latest-${currentQuiz.id}`,
            exam: currentQuiz.title || 'Latest Mock Exam',
            date: new Date(),
            scorePercent,
            answered,
            totalQuestions,
            correctAnswers,
            timeSpentSeconds,
            status: scorePercent >= PASS_MARK ? 'passed' : 'failed',
            source: 'latest',
        };
    }, [currentQuiz, isCompleted, answers, timeRemaining]);

    const historyResults = useMemo<ResultItem[]>(
        () => [
            {
                id: 'history-1',
                exam: 'JAMB Mixed Practice',
                date: new Date('2026-04-13T10:15:00'),
                scorePercent: 78,
                answered: 37,
                totalQuestions: 40,
                correctAnswers: 31,
                timeSpentSeconds: 1960,
                status: 'passed',
                source: 'history',
            },
            {
                id: 'history-2',
                exam: 'Physics Speed Drill',
                date: new Date('2026-04-10T14:05:00'),
                scorePercent: 65,
                answered: 20,
                totalQuestions: 25,
                correctAnswers: 16,
                timeSpentSeconds: 1220,
                status: 'failed',
                source: 'history',
            },
            {
                id: 'history-3',
                exam: 'English Focus Session',
                date: new Date('2026-04-08T09:30:00'),
                scorePercent: 84,
                answered: 29,
                totalQuestions: 30,
                correctAnswers: 25,
                timeSpentSeconds: 1505,
                status: 'passed',
                source: 'history',
            },
        ],
        [],
    );

    const allResults = useMemo(() => {
        const list = latestResult ? [latestResult, ...historyResults] : historyResults;

        const filtered = list.filter((result) =>
            result.exam.toLowerCase().includes(searchQuery.toLowerCase()),
        );

        return filtered.sort((a, b) => {
            if (sortBy === 'score') return b.scorePercent - a.scorePercent;
            return b.date.getTime() - a.date.getTime();
        });
    }, [latestResult, historyResults, searchQuery, sortBy]);

    const stats = useMemo(() => {
        const totalTests = allResults.length;
        const passed = allResults.filter((result) => result.status === 'passed').length;
        const averageScore = totalTests
            ? Math.round(
                allResults.reduce((sum, result) => sum + result.scorePercent, 0) /
                totalTests,
            )
            : 0;

        return {
            totalTests,
            averageScore,
            passed,
            passRate: totalTests ? Math.round((passed / totalTests) * 100) : 0,
        };
    }, [allResults]);

    return (
        <Layout title="Results" streak={7}>
            <div className="space-y-6 px-3 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                    <Card className="p-4 text-center sm:p-6">
                        <p className="text-3xl font-bold text-primary-600 sm:text-4xl">{stats.totalTests}</p>
                        <p className="mt-1 text-xs text-spiritual-600 sm:text-sm">Total Sessions</p>
                    </Card>
                    <Card className="p-4 text-center sm:p-6">
                        <p className="text-3xl font-bold text-success-600 sm:text-4xl">{stats.averageScore}%</p>
                        <p className="mt-1 text-xs text-spiritual-600 sm:text-sm">Average Accuracy</p>
                    </Card>
                    <Card className="p-4 text-center sm:p-6">
                        <p className="text-3xl font-bold text-secondary-600 sm:text-4xl">{stats.passed}</p>
                        <p className="mt-1 text-xs text-spiritual-600 sm:text-sm">Passed Sessions</p>
                    </Card>
                    <Card className="p-4 text-center sm:p-6">
                        <p className="text-3xl font-bold text-warning-600 sm:text-4xl">{stats.passRate}%</p>
                        <p className="mt-1 text-xs text-spiritual-600 sm:text-sm">Pass Rate</p>
                    </Card>
                </div>

                <Card className="rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 to-secondary-50 p-5 sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary-700">
                                <Trophy className="h-4 w-4" />
                                Latest Attempt
                            </p>
                            <h2 className="text-xl font-bold text-spiritual-900 sm:text-2xl">
                                {latestResult ? latestResult.exam : 'No completed session yet'}
                            </h2>
                            <p className="mt-1 text-sm text-spiritual-600 sm:text-base">
                                {latestResult
                                    ? `Completed on ${formatResultDate(latestResult.date)}`
                                    : 'Complete a quiz to generate your latest result summary here.'}
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                            <Button variant="primary" onClick={() => navigate('/student/exams/instructions')}>
                                Start New Session
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/student/dashboard')}>
                                Back to Dashboard
                            </Button>
                        </div>
                    </div>

                    {latestResult && (
                        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-xl border border-white bg-white/80 p-3">
                                <p className="text-xs text-spiritual-600">Score</p>
                                <p className="text-lg font-bold text-spiritual-900">{latestResult.scorePercent}%</p>
                            </div>
                            <div className="rounded-xl border border-white bg-white/80 p-3">
                                <p className="text-xs text-spiritual-600">Correct Answers</p>
                                <p className="text-lg font-bold text-spiritual-900">
                                    {latestResult.correctAnswers}/{latestResult.totalQuestions}
                                </p>
                            </div>
                            <div className="rounded-xl border border-white bg-white/80 p-3">
                                <p className="text-xs text-spiritual-600">Questions Answered</p>
                                <p className="text-lg font-bold text-spiritual-900">
                                    {latestResult.answered}/{latestResult.totalQuestions}
                                </p>
                            </div>
                            <div className="rounded-xl border border-white bg-white/80 p-3">
                                <p className="text-xs text-spiritual-600">Time Spent</p>
                                <p className="text-lg font-bold text-spiritual-900">
                                    {formatDuration(latestResult.timeSpentSeconds)}
                                </p>
                            </div>
                        </div>
                    )}
                </Card>

                <div className="space-y-4 lg:flex lg:items-center lg:gap-4 lg:space-y-0">
                    <Input
                        placeholder="Search sessions..."
                        leftIcon={<Search size={18} />}
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="lg:flex-1"
                    />
                    <select
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value as 'date' | 'score')}
                        className="select-field w-full lg:w-56"
                    >
                        <option value="date">Sort by Newest</option>
                        <option value="score">Sort by Highest Score</option>
                    </select>
                </div>

                <Card className="p-4 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-spiritual-900">Recent Sessions</h3>
                        <p className="text-sm text-spiritual-600">{allResults.length} records</p>
                    </div>

                    <div className="space-y-3">
                        {allResults.length > 0 ? (
                            allResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="rounded-xl border border-spiritual-200 bg-white p-4 transition-colors hover:border-spiritual-300"
                                >
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="font-semibold text-spiritual-900">{result.exam}</p>
                                            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-spiritual-600 sm:text-sm">
                                                <span className="inline-flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatResultDate(result.date)}
                                                </span>
                                                <span className="inline-flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {formatDuration(result.timeSpentSeconds)}
                                                </span>
                                                <span>
                                                    Answered {result.answered}/{result.totalQuestions}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="text-left sm:text-right">
                                            <p
                                                className={`text-2xl font-bold ${result.scorePercent >= PASS_MARK
                                                        ? 'text-success-600'
                                                        : 'text-error-600'
                                                    }`}
                                            >
                                                {result.scorePercent}%
                                            </p>
                                            <Badge
                                                variant={result.status === 'passed' ? 'success' : 'error'}
                                                size="sm"
                                            >
                                                {result.status === 'passed' ? 'Passed' : 'Needs Review'}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="mb-1 flex items-center justify-between text-xs text-spiritual-600 sm:text-sm">
                                            <span className="inline-flex items-center gap-1">
                                                <CheckCircle className="h-4 w-4" />
                                                Accuracy
                                            </span>
                                            <span className="font-semibold text-spiritual-800">
                                                {result.correctAnswers}/{result.totalQuestions} correct
                                            </span>
                                        </div>
                                        <ProgressBar value={result.scorePercent} showLabel={false} animated={false} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-xl border border-dashed border-spiritual-300 py-12 text-center">
                                <BarChart3 className="mx-auto mb-3 h-10 w-10 text-spiritual-300" />
                                <p className="font-medium text-spiritual-700">No results found</p>
                                <p className="mt-1 text-sm text-spiritual-500">
                                    Try a different search or complete a new quiz session.
                                </p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default Results;
