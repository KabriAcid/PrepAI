import React, { useState } from 'react'
import { TrendingUp, Calendar, BookOpen, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import Tabs from '@/components/ui/Tabs'

const Performance: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month')

  const performanceMetrics = {
    overallScore: 78.5,
    improvement: 5.2,
    totalTimeSpent: '45.5 hours',
    questionsAnswered: 1245,
    accuracy: 78.5,
    consistencyScore: 82,
  }

  const subjectPerformance = [
    { subject: 'Mathematics', score: 88, trend: 'up', change: 3.5 },
    { subject: 'English', score: 75, trend: 'up', change: 2.1 },
    { subject: 'Physics', score: 82, trend: 'down', change: -1.2 },
    { subject: 'Chemistry', score: 70, trend: 'up', change: 4.3 },
    { subject: 'Biology', score: 92, trend: 'up', change: 6.7 },
  ]

  const weeklyProgress = [
    { day: 'Mon', score: 75, tests: 2 },
    { day: 'Tue', score: 78, tests: 3 },
    { day: 'Wed', score: 82, tests: 2 },
    { day: 'Thu', score: 80, tests: 1 },
    { day: 'Fri', score: 85, tests: 4 },
    { day: 'Sat', score: 88, tests: 5 },
    { day: 'Sun', score: 90, tests: 3 },
  ]

  const strengths = [
    'Quick problem solving in Mathematics',
    'Strong comprehension skills in English',
    'Consistent performance in Biology',
    'Improving time management',
  ]

  const improvements = [
    'Chemistry fundamentals need more practice',
    'Physics mechanics concepts need review',
    'Work on faster reading speed',
    'Practice more complex problem-solving',
  ]

  const MetricCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; color: string }> = ({
    label,
    value,
    icon,
    color,
  }) => (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm text-spiritual-600">{label}</p>
          <p className="mt-1 text-2xl sm:text-3xl font-bold text-spiritual-900">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color} sm:h-16 sm:w-16`}>
          {icon}
        </div>
      </div>
    </Card>
  )

  const tabContent = {
    overview: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            label="Overall Score"
            value={`${performanceMetrics.overallScore}%`}
            icon={<TrendingUp size={24} className="text-primary-600" />}
            color="bg-primary-100"
          />
          <MetricCard
            label="Improvement"
            value={`+${performanceMetrics.improvement}%`}
            icon={<Zap size={24} className="text-success-600" />}
            color="bg-success-100"
          />
          <MetricCard
            label="Total Time Spent"
            value={performanceMetrics.totalTimeSpent}
            icon={<Calendar size={24} className="text-secondary-600" />}
            color="bg-secondary-100"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4 sm:p-6">
            <p className="mb-4 font-bold text-spiritual-900">Accuracy Rate</p>
            <ProgressBar value={performanceMetrics.accuracy} maxValue={100} showLabel={true} />
          </Card>
          <Card className="p-4 sm:p-6">
            <p className="mb-4 font-bold text-spiritual-900">Consistency Score</p>
            <ProgressBar value={performanceMetrics.consistencyScore} maxValue={100} showLabel={true} />
          </Card>
        </div>

        <Card className="p-4 sm:p-6">
          <p className="mb-4 font-bold text-spiritual-900">Questions Answered</p>
          <p className="text-3xl sm:text-4xl font-bold text-primary-600">{performanceMetrics.questionsAnswered}</p>
        </Card>
      </motion.div>
    ),

    subjects: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {subjectPerformance.map((subject) => (
          <Card key={subject.subject} className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 font-bold">
                  {subject.subject.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-spiritual-900">{subject.subject}</p>
                  <p className="text-xs text-spiritual-600">
                    {subject.trend === 'up' ? '↑' : '↓'} {Math.abs(subject.change)}% from last week
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-spiritual-900">{subject.score}%</p>
                <Badge variant={subject.trend === 'up' ? 'success' : 'error'} size="sm">
                  {subject.trend === 'up' ? 'Improving' : 'Declining'}
                </Badge>
              </div>
            </div>
            <ProgressBar value={subject.score} showLabel={false} animated={false} />
          </Card>
        ))}
      </motion.div>
    ),

    weekly: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <Card className="p-4 sm:p-6">
          <p className="mb-6 font-bold text-spiritual-900">Weekly Performance</p>
          <div className="space-y-4">
            {weeklyProgress.map((day) => (
              <div key={day.day}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-spiritual-700">
                    {day.day} ({day.tests} tests)
                  </span>
                  <span className="text-sm font-bold text-spiritual-900">{day.score}%</span>
                </div>
                <ProgressBar value={day.score} showLabel={false} animated={false} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <p className="mb-4 font-bold text-spiritual-900">Daily Activity</p>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day) => (
              <div
                key={day.day}
                className="flex flex-col items-center justify-between rounded-lg bg-gradient-to-b from-primary-100 to-primary-50 p-3"
              >
                <span className="text-xs font-bold text-primary-600">{day.tests}</span>
                <span className="mt-2 text-xs font-medium text-spiritual-700">{day.day}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    ),

    insights: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <Card className="p-4 sm:p-6 border-l-4 border-l-success-500">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-spiritual-900">
            <span className="text-2xl">✓</span> Strengths
          </h3>
          <ul className="space-y-3">
            {strengths.map((strength) => (
              <li key={strength} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success-100">
                  <span className="text-xs font-bold text-success-600">✓</span>
                </span>
                <span className="text-sm text-spiritual-700">{strength}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4 sm:p-6 border-l-4 border-l-warning-500">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-spiritual-900">
            <span className="text-2xl">!</span> Areas for Improvement
          </h3>
          <ul className="space-y-3">
            {improvements.map((improvement) => (
              <li key={improvement} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-warning-100">
                  <span className="text-xs font-bold text-warning-600">!</span>
                </span>
                <span className="text-sm text-spiritual-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-r from-primary-50 to-secondary-50">
          <h3 className="mb-3 font-bold text-spiritual-900">Recommendation</h3>
          <p className="text-sm text-spiritual-700">
            Based on your performance, focus on Chemistry fundamentals and Physics mechanics. Consider taking targeted practice tests in these areas and reviewing the core concepts before attempting full-length exams.
          </p>
        </Card>
      </motion.div>
    ),
  }

  const tabs = [
    { id: 'overview', label: 'Overview', content: tabContent.overview, icon: <TrendingUp size={18} /> },
    { id: 'subjects', label: 'Subjects', content: tabContent.subjects, icon: <BookOpen size={18} /> },
    { id: 'weekly', label: 'Weekly', content: tabContent.weekly, icon: <Calendar size={18} /> },
    { id: 'insights', label: 'Insights', content: tabContent.insights, icon: <Zap size={18} /> },
  ]

  return (
    <Layout title="Performance Analytics" streak={7}>
      <div className="space-y-6 px-3 sm:px-6 lg:px-8">
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h3 className="font-bold text-spiritual-900">Time Range</h3>
            <div className="flex gap-2">
              {(['week', 'month', 'all'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-primary-500 text-white'
                      : 'bg-spiritual-100 text-spiritual-700 hover:bg-spiritual-200'
                  }`}
                >
                  {range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : 'All Time'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <Tabs tabs={tabs} defaultTab="overview" />
        </Card>
      </div>
    </Layout>
  )
}

export default Performance
