import React, { useState } from 'react'
import { BookOpen, Clock, Zap, Filter, Search, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/input'

const PracticeTests: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology']
  const difficulties = ['Easy', 'Medium', 'Hard']

  const practiceTests = [
    {
      id: 1,
      title: 'Algebra Basics',
      subject: 'Mathematics',
      difficulty: 'Easy',
      questions: 20,
      duration: '1 hour',
      rating: 4.5,
      attempts: 1234,
      icon: '🔢',
    },
    {
      id: 2,
      title: 'Advanced Calculus',
      subject: 'Mathematics',
      difficulty: 'Hard',
      questions: 40,
      duration: '2 hours',
      rating: 4.8,
      attempts: 567,
      icon: '📊',
    },
    {
      id: 3,
      title: 'Comprehension Skills',
      subject: 'English',
      difficulty: 'Medium',
      questions: 25,
      duration: '1.5 hours',
      rating: 4.3,
      attempts: 892,
      icon: '📖',
    },
    {
      id: 4,
      title: 'Essay Writing Techniques',
      subject: 'English',
      difficulty: 'Medium',
      questions: 5,
      duration: '2 hours',
      rating: 4.6,
      attempts: 445,
      icon: '✍️',
    },
    {
      id: 5,
      title: 'Mechanics Fundamentals',
      subject: 'Physics',
      difficulty: 'Easy',
      questions: 30,
      duration: '1.5 hours',
      rating: 4.4,
      attempts: 678,
      icon: '⚙️',
    },
    {
      id: 6,
      title: 'Thermodynamics Advanced',
      subject: 'Physics',
      difficulty: 'Hard',
      questions: 35,
      duration: '2 hours',
      rating: 4.7,
      attempts: 423,
      icon: '🔥',
    },
    {
      id: 7,
      title: 'Organic Chemistry Basics',
      subject: 'Chemistry',
      difficulty: 'Medium',
      questions: 40,
      duration: '2 hours',
      rating: 4.5,
      attempts: 556,
      icon: '🧪',
    },
    {
      id: 8,
      title: 'Periodic Table Mastery',
      subject: 'Chemistry',
      difficulty: 'Easy',
      questions: 25,
      duration: '1 hour',
      rating: 4.2,
      attempts: 734,
      icon: '⚛️',
    },
    {
      id: 9,
      title: 'Cell Biology Deep Dive',
      subject: 'Biology',
      difficulty: 'Hard',
      questions: 45,
      duration: '2.5 hours',
      rating: 4.6,
      attempts: 389,
      icon: '🧬',
    },
    {
      id: 10,
      title: 'Photosynthesis Process',
      subject: 'Biology',
      difficulty: 'Easy',
      questions: 20,
      duration: '1 hour',
      rating: 4.1,
      attempts: 612,
      icon: '🌿',
    },
  ]

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

  const filteredTests = practiceTests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = !selectedSubject || test.subject === selectedSubject
    const matchesDifficulty = !selectedDifficulty || test.difficulty === selectedDifficulty
    return matchesSearch && matchesSubject && matchesDifficulty
  })

  const PracticeTestCard: React.FC<any> = ({ test }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="border border-spiritual-200 rounded-xl overflow-hidden hover:shadow-medium transition-all duration-300 flex flex-col"
    >
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 sm:p-6 flex items-center justify-between">
        <div className="text-4xl sm:text-5xl">{test.icon}</div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-warning-500 fill-warning-500" />
            <span className="text-sm font-bold text-spiritual-900">{test.rating}</span>
          </div>
          <p className="text-xs text-spiritual-600">{test.attempts} attempts</p>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <h3 className="font-semibold text-spiritual-900 mb-2 line-clamp-2">{test.title}</h3>

        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="neutral" size="sm" icon={<BookOpen size={14} />}>
            {test.subject}
          </Badge>
          <Badge variant={getDifficultyColor(test.difficulty) as any} size="sm">
            {test.difficulty}
          </Badge>
        </div>

        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center gap-2 text-sm text-spiritual-600">
            <FileQuestion size={16} />
            <span>{test.questions} Questions</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-spiritual-600">
            <Clock size={16} />
            <span>{test.duration}</span>
          </div>
        </div>

        <Button variant="primary" size="md" fullWidth>
          Start Test
        </Button>
      </div>
    </motion.div>
  )

  return (
    <Layout title="Practice Tests" streak={7}>
      <div className="space-y-6 px-3 sm:px-6 lg:px-8">
        <div className="space-y-4 lg:flex lg:items-end lg:gap-4 lg:space-y-0">
          <Input
            placeholder="Search practice tests..."
            leftIcon={<Search size={18} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="lg:flex-1"
          />
        </div>

        <Card className="p-4 sm:p-6">
          <h3 className="mb-4 font-bold text-spiritual-900">Filters</h3>
          <div className="space-y-4 lg:space-y-0 lg:flex lg:gap-6">
            <div className="lg:flex-1">
              <p className="mb-2 text-sm font-medium text-spiritual-700">Subject</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubject(null)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!selectedSubject
                      ? 'bg-primary-500 text-white'
                      : 'bg-spiritual-100 text-spiritual-700 hover:bg-spiritual-200'
                    }`}
                >
                  All
                </button>
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedSubject === subject
                        ? 'bg-primary-500 text-white'
                        : 'bg-spiritual-100 text-spiritual-700 hover:bg-spiritual-200'
                      }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:flex-1">
              <p className="mb-2 text-sm font-medium text-spiritual-700">Difficulty</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDifficulty(null)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!selectedDifficulty
                      ? 'bg-primary-500 text-white'
                      : 'bg-spiritual-100 text-spiritual-700 hover:bg-spiritual-200'
                    }`}
                >
                  All
                </button>
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedDifficulty === difficulty
                        ? 'bg-primary-500 text-white'
                        : 'bg-spiritual-100 text-spiritual-700 hover:bg-spiritual-200'
                      }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredTests.map((test) => (
              <PracticeTestCard key={test.id} test={test} />
            ))}
          </div>
        ) : (
          <Card className="py-12 text-center">
            <Zap size={48} className="mx-auto text-spiritual-300 mb-4" />
            <p className="text-spiritual-600 font-medium">No practice tests found</p>
            <p className="text-sm text-spiritual-500 mt-1">Try adjusting your filters</p>
          </Card>
        )}
      </div>
    </Layout>
  )
}

const FileQuestion = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M15 2v5h5" />
    <path d="M12 13h-2" />
    <path d="M12 17h-2" />
    <path d="M9 9h4" />
  </svg>
)

export default PracticeTests
