import React, { useState } from 'react'
import { BookOpen, Clock, FileQuestion, Rocket, CheckCircle, BarChart3, Book } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/card'
import Layout from '@/components/layout/Layout'
import Button from '@/components/ui/button'
import StatCard from '@/components/ui/StatCard'
import ProgressBar from '@/components/ui/ProgressBar'
import Badge from '@/components/ui/badge'
import { SkeletonStatCard, SkeletonExamCard, SkeletonChart } from '@/components/ui/SkeletonLoader'

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const stats = [
    {
      icon: Book,
      title: 'Total Exams',
      value: 12,
      subtitle: '+3 this week',
      badgeColor: 'primary' as const,
      trend: { label: 'this week', value: '+3', isPositive: true },
    },
    {
      icon: CheckCircle,
      title: 'Completed',
      value: 8,
      subtitle: null,
      badgeColor: 'success' as const,
      showProgress: true,
      progressValue: 66.66,
    },
    {
      icon: BarChart3,
      title: 'Avg Score',
      value: '75%',
      subtitle: null,
      badgeColor: 'secondary' as const,
      trend: { label: 'from last week', value: '+5%', isPositive: true },
    },
    {
      icon: BarChart3,
      title: 'Class Rank',
      value: '#15',
      subtitle: 'Out of 120 students',
      badgeColor: 'warning' as const,
    },
  ]

  const upcomingExams = [
    {
      id: 1,
      title: 'JAMB Physics 2025 Mock',
      subject: 'Physics',
      duration: '2 hours',
      questions: 40,
      scheduledAt: '2025-11-20 10:00 AM',
    },
    {
      id: 2,
      title: 'WAEC English Literature',
      subject: 'English',
      duration: '3 hours',
      questions: 50,
      scheduledAt: '2025-11-22 02:00 PM',
    },
    {
      id: 3,
      title: 'Chemistry Fundamentals',
      subject: 'Chemistry',
      duration: '2.5 hours',
      questions: 45,
      scheduledAt: '2025-11-25 09:00 AM',
    },
  ]

  const recentResults = [
    { exam: 'Math Quiz', score: 85, total: 100, percentage: 85, date: new Date('2025-11-10'), status: 'passed' },
    { exam: 'Physics Test', score: 72, total: 100, percentage: 72, date: new Date('2025-11-09'), status: 'passed' },
    { exam: 'Chemistry Test', score: 55, total: 100, percentage: 55, date: new Date('2025-11-08'), status: 'failed' },
  ]

  const bestSubjectData = { subject: 'Mathematics', percentage: 88 }

  const topPerformers = [
    { rank: 1, name: 'Amina Hassan', school: 'LSU Secondary', score: 95 },
    { rank: 2, name: 'Chukwu Okoro', school: 'Queens College', score: 92 },
    { rank: 3, name: 'Fatima Bello', school: 'FGGC Accra', score: 90 },
    { rank: 4, name: 'David Okonkwo', school: 'Federal College', score: 88 },
    { rank: 5, name: 'Zainab Ahmad', school: 'Sani Abacha School', score: 85 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <Layout title="Dashboard" streak={7}>
      <div className="space-y-6 sm:space-y-8 px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-500 to-secondary-600 p-4 sm:p-6 md:p-7 lg:p-8 text-white shadow-strong"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Welcome back, kabriacid01! 👋</h2>
              <p className="mt-2 text-sm sm:text-base text-white/90">Ready to ace your exams? Let's keep the momentum going!</p>
            </div>
            <div className="hidden md:block opacity-20">
              <Rocket size={80} />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          {isLoading ? (
            <>
              <SkeletonStatCard />
              <SkeletonStatCard />
              <SkeletonStatCard />
              <SkeletonStatCard />
            </>
          ) : (
            stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-4 sm:p-5 lg:p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-spiritual-900">Upcoming Exams</h3>
                <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
                  View All
                  <span>→</span>
                </a>
              </div>

              <div className="space-y-3">
                {isLoading ? (
                  <>
                    <SkeletonExamCard />
                    <SkeletonExamCard />
                    <SkeletonExamCard />
                  </>
                ) : (
                  upcomingExams.map((exam) => (
                    <motion.div
                      key={exam.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-spiritual-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-primary-300 hover:shadow-medium transition-all duration-300"
                    >
                      <h4 className="font-semibold text-spiritual-900 line-clamp-2">{exam.title}</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="neutral" size="sm" icon={<Book size={14} />}>
                          {exam.subject}
                        </Badge>
                        <Badge variant="neutral" size="sm" icon={<Clock size={14} />}>
                          {exam.duration}
                        </Badge>
                        <Badge variant="neutral" size="sm" icon={<FileQuestion size={14} />}>
                          {exam.questions} Qs
                        </Badge>
                      </div>
                      <p className="mt-3 text-xs sm:text-sm text-spiritual-600">
                        Scheduled: {exam.scheduledAt}
                      </p>
                      <Button variant="primary" size="md" fullWidth className="mt-3">
                        Start Exam
                      </Button>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>

            <Card className="p-4 sm:p-5 lg:p-6">
              <h3 className="mb-6 text-lg sm:text-xl lg:text-2xl font-bold text-spiritual-900">Subject Performance</h3>
              <div className="space-y-4">
                {isLoading ? (
                  <SkeletonChart />
                ) : (
                  <>
                    {[
                      { subject: 'Mathematics', percentage: 88, color: 'from-primary-500 to-primary-600' },
                      { subject: 'English', percentage: 75, color: 'from-secondary-500 to-secondary-600' },
                      { subject: 'Physics', percentage: 82, color: 'from-success-500 to-success-600' },
                      { subject: 'Chemistry', percentage: 70, color: 'from-warning-500 to-warning-600' },
                    ].map((item) => (
                      <div key={item.subject}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-spiritual-700">{item.subject}</span>
                          <span className="font-bold text-spiritual-900">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-spiritual-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-spiritual-200">
                      <div>
                        <p className="text-xs text-spiritual-600">Overall Average</p>
                        <p className="text-2xl font-bold text-spiritual-900">80.75%</p>
                      </div>
                      <div>
                        <p className="text-xs text-spiritual-600">Week Improvement</p>
                        <p className="text-2xl font-bold text-success-600">↑ 3.2%</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>

            <Card className="p-4 sm:p-5 lg:p-6">
              <h3 className="mb-6 text-lg sm:text-xl lg:text-2xl font-bold text-spiritual-900">Recent Results</h3>
              <div className="space-y-3">
                {isLoading ? (
                  <>
                    <SkeletonExamCard />
                    <SkeletonExamCard />
                    <SkeletonExamCard />
                  </>
                ) : (
                  recentResults.map((result, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 border-b border-spiritual-100 pb-3 last:border-b-0"
                    >
                      <div className={`rounded-full p-2 ${result.status === 'passed' ? 'bg-success-100' : 'bg-error-100'}`}>
                        {result.status === 'passed' ? (
                          <CheckCircle size={20} className="text-success-600" />
                        ) : (
                          <CheckCircle size={20} className="text-error-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-spiritual-900">{result.exam}</p>
                        <p className="text-xs text-spiritual-500">
                          {result.date.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${result.percentage >= 70 ? 'text-success-600' : 'text-error-600'}`}>
                          {result.percentage}%
                        </p>
                        <p className="text-xs text-spiritual-600">{result.score}/{result.total}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-4 sm:p-5 lg:p-6">
              <h3 className="mb-4 font-bold text-spiritual-900">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-primary-50 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100">
                    <BookOpen size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-spiritual-900">Start Practice</p>
                    <p className="text-xs text-spiritual-600">Take a quick test</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-secondary-50 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-100">
                    <BarChart3 size={18} className="text-secondary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-spiritual-900">View Results</p>
                    <p className="text-xs text-spiritual-600">Check performance</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-success-50 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-100">
                    <Book size={18} className="text-success-600" />
                  </div>
                  <div>
                    <p className="font-medium text-spiritual-900">Browse Subjects</p>
                    <p className="text-xs text-spiritual-600">Explore topics</p>
                  </div>
                </a>
              </div>
            </Card>

            <Card className="p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-warning-500 to-warning-600 text-white border-white/20">
              <div className="flex items-start gap-3">
                <div className="text-3xl">⭐</div>
                <div>
                  <p className="text-sm font-medium text-white/90">Best Subject</p>
                  <p className="mt-1 text-xl font-bold">{bestSubjectData.subject}</p>
                  <p className="text-xs text-white/70">Keep up the great work!</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-5 lg:p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100">
                  <BookOpen size={18} className="text-primary-600" />
                </div>
                <h3 className="font-bold text-spiritual-900">Study Tip</h3>
              </div>
              <p className="text-sm text-spiritual-700 leading-relaxed">
                Practice consistently for 45 minutes with 15-minute breaks. This technique, known as the Pomodoro method, maximizes retention and focus.
              </p>
            </Card>

            <Card className="p-4 sm:p-5 lg:p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="text-xl">🏆</div>
                <h3 className="font-bold text-spiritual-900">Top Performers</h3>
              </div>
              <div className="space-y-2">
                {topPerformers.map((performer) => {
                  const medals = ['🥇', '🥈', '🥉']
                  const medal = performer.rank <= 3 ? medals[performer.rank - 1] : performer.rank
                  const bgColor = performer.rank <= 3
                    ? performer.rank === 1
                      ? 'bg-yellow-100'
                      : performer.rank === 2
                        ? 'bg-gray-100'
                        : 'bg-orange-100'
                    : 'bg-primary-100'

                  return (
                    <div key={performer.rank} className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${bgColor}`}>
                        {typeof medal === 'string' && medal.length > 1 ? medal : performer.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-spiritual-900 truncate">{performer.name}</p>
                        <p className="text-xs text-spiritual-600">{performer.school}</p>
                      </div>
                      <p className="text-sm font-bold text-spiritual-900">{performer.score}</p>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
