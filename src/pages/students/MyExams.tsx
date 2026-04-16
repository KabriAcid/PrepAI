import React, { useState } from 'react'
import { BookOpen, Clock, FileQuestion, Filter, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/input'

const MyExams: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'practice' | 'completed'>('upcoming')
  const [searchQuery, setSearchQuery] = useState('')

  const exams = {
    upcoming: [
      {
        id: 1,
        title: 'JAMB Physics 2025 Mock',
        subject: 'Physics',
        duration: '2 hours',
        questions: 40,
        scheduled: '2025-11-20 10:00 AM',
        difficulty: 'Hard',
        status: 'scheduled',
      },
      {
        id: 2,
        title: 'WAEC English Literature',
        subject: 'English',
        duration: '3 hours',
        questions: 50,
        scheduled: '2025-11-22 02:00 PM',
        difficulty: 'Medium',
        status: 'scheduled',
      },
      {
        id: 3,
        title: 'Chemistry Fundamentals',
        subject: 'Chemistry',
        duration: '2.5 hours',
        questions: 45,
        scheduled: '2025-11-25 09:00 AM',
        difficulty: 'Medium',
        status: 'scheduled',
      },
    ],
    practice: [
      {
        id: 4,
        title: 'Basic Mathematics Practice',
        subject: 'Mathematics',
        duration: '1.5 hours',
        questions: 30,
        difficulty: 'Easy',
        score: null,
        status: 'available',
      },
      {
        id: 5,
        title: 'Advanced Physics Topics',
        subject: 'Physics',
        duration: '2 hours',
        questions: 35,
        difficulty: 'Hard',
        score: null,
        status: 'available',
      },
      {
        id: 6,
        title: 'Biology: Cell Structure',
        subject: 'Biology',
        duration: '1 hour',
        questions: 20,
        difficulty: 'Easy',
        score: null,
        status: 'available',
      },
    ],
    completed: [
      {
        id: 7,
        title: 'Mathematics Mock Exam',
        subject: 'Mathematics',
        duration: '2 hours',
        questions: 40,
        completed: '2025-11-10',
        score: 85,
        total: 100,
        status: 'passed',
      },
      {
        id: 8,
        title: 'Physics Fundamentals',
        subject: 'Physics',
        duration: '2 hours',
        questions: 35,
        completed: '2025-11-09',
        score: 72,
        total: 100,
        status: 'passed',
      },
      {
        id: 9,
        title: 'Chemistry Practice Test',
        subject: 'Chemistry',
        duration: '1.5 hours',
        questions: 30,
        completed: '2025-11-08',
        score: 55,
        total: 100,
        status: 'failed',
      },
    ],
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'success'
      case 'Medium':
        return 'warning'
      case 'Hard':
        return 'error'
      default:
        return 'neutral'
    }
  }

  const ExamCard: React.FC<any> = ({ exam, type }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-spiritual-200 rounded-lg sm:rounded-xl p-4 hover:shadow-medium transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-spiritual-900 line-clamp-2">{exam.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="neutral" size="sm" icon={<BookOpen size={14} />}>
              {exam.subject}
            </Badge>
            <Badge variant="neutral" size="sm" icon={<Clock size={14} />}>
              {exam.duration}
            </Badge>
            <Badge variant="neutral" size="sm" icon={<FileQuestion size={14} />}>
              {exam.questions} Qs
            </Badge>
            {exam.difficulty && (
              <Badge variant={getDifficultyColor(exam.difficulty) as any} size="sm">
                {exam.difficulty}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {type === 'upcoming' && (
        <div className="mb-3">
          <p className="text-xs sm:text-sm text-spiritual-600">Scheduled: {exam.scheduled}</p>
          <Button variant="primary" size="md" fullWidth className="mt-3">
            Start Exam
          </Button>
        </div>
      )}

      {type === 'practice' && (
        <Button variant="primary" size="md" fullWidth>
          Start Practice
        </Button>
      )}

      {type === 'completed' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-spiritual-600">Completed: {exam.completed}</p>
            <div className={`rounded-lg px-3 py-1 ${exam.status === 'passed' ? 'bg-success-100 text-success-700' : 'bg-error-100 text-error-700'}`}>
              <span className="text-xs font-medium">{exam.status === 'passed' ? '✓ Passed' : '✗ Failed'}</span>
            </div>
          </div>
          <div className="bg-spiritual-100 rounded-lg p-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-spiritual-700">Score</span>
              <span className={`text-lg font-bold ${exam.status === 'passed' ? 'text-success-600' : 'text-error-600'}`}>
                {exam.score}%
              </span>
            </div>
            <p className="text-xs text-spiritual-600 mt-1">{exam.score}/{exam.total}</p>
          </div>
        </div>
      )}
    </motion.div>
  )

  const filteredExams = exams[selectedTab].filter((exam: any) =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Layout title="My Exams" streak={7}>
      <div className="space-y-6 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 flex-col sm:flex-row">
          <Input
            placeholder="Search exams..."
            leftIcon={<Search size={18} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:flex-1"
          />
          <Button variant="secondary" leftIcon={<Filter size={18} />}>
            Filter
          </Button>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="flex border-b border-spiritual-200">
            {(['upcoming', 'practice', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 px-4 py-3 text-sm sm:text-base font-medium transition-all duration-300 ${selectedTab === tab
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-spiritual-600 hover:text-spiritual-700'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {filteredExams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredExams.map((exam: any) => (
                  <ExamCard key={exam.id} exam={exam} type={selectedTab} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <BookOpen size={48} className="mx-auto text-spiritual-300 mb-4" />
                <p className="text-spiritual-600 font-medium">No {selectedTab} exams found</p>
                <p className="text-sm text-spiritual-500 mt-1">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default MyExams
