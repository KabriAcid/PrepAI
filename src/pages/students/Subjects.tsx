import React, { useState } from 'react'
import { BookOpen, TrendingUp, Clock, Zap, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import ProgressBar from '@/components/ui/ProgressBar'
import Input from '@/components/ui/input'

const Subjects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const subjects = [
    {
      id: 1,
      name: 'Mathematics',
      icon: '🔢',
      color: 'from-blue-500 to-blue-600',
      progress: 88,
      score: 85,
      topics: 24,
      testsCompleted: 12,
      lastStudied: '2 hours ago',
      description: 'Algebra, Geometry, Calculus, and more',
    },
    {
      id: 2,
      name: 'English',
      icon: '📖',
      color: 'from-green-500 to-green-600',
      progress: 75,
      score: 72,
      topics: 18,
      testsCompleted: 8,
      lastStudied: '5 hours ago',
      description: 'Literature, Grammar, Comprehension',
    },
    {
      id: 3,
      name: 'Physics',
      icon: '⚙️',
      color: 'from-purple-500 to-purple-600',
      progress: 82,
      score: 80,
      topics: 22,
      testsCompleted: 10,
      lastStudied: '1 day ago',
      description: 'Mechanics, Thermodynamics, Waves',
    },
    {
      id: 4,
      name: 'Chemistry',
      icon: '🧪',
      color: 'from-red-500 to-red-600',
      progress: 70,
      score: 68,
      topics: 20,
      testsCompleted: 7,
      lastStudied: '2 days ago',
      description: 'Organic, Inorganic, Physical Chemistry',
    },
    {
      id: 5,
      name: 'Biology',
      icon: '🧬',
      color: 'from-emerald-500 to-emerald-600',
      progress: 92,
      score: 90,
      topics: 19,
      testsCompleted: 11,
      lastStudied: '3 hours ago',
      description: 'Cell Biology, Genetics, Ecology',
    },
    {
      id: 6,
      name: 'History',
      icon: '📚',
      color: 'from-amber-500 to-amber-600',
      progress: 65,
      score: 62,
      topics: 15,
      testsCompleted: 5,
      lastStudied: '5 days ago',
      description: 'Ancient to Modern History',
    },
  ]

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const SubjectCard: React.FC<any> = ({ subject }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="border border-spiritual-200 rounded-xl overflow-hidden hover:shadow-medium transition-all duration-300 flex flex-col h-full"
    >
      <div className={`bg-gradient-to-r ${subject.color} p-4 sm:p-6 text-white flex items-start justify-between`}>
        <div>
          <p className="text-4xl sm:text-5xl mb-2">{subject.icon}</p>
          <h3 className="text-xl sm:text-2xl font-bold">{subject.name}</h3>
          <p className="text-sm text-white/80 mt-1">{subject.description}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl sm:text-4xl font-bold">{subject.score}%</p>
          <p className="text-xs sm:text-sm text-white/70">Score</p>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-spiritual-700">Progress</span>
              <span className="text-sm font-bold text-spiritual-900">{subject.progress}%</span>
            </div>
            <ProgressBar value={subject.progress} showLabel={false} animated={false} />
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-spiritual-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-primary-600">{subject.topics}</p>
              <p className="text-xs text-spiritual-600">Topics</p>
            </div>
            <div className="bg-spiritual-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-success-600">{subject.testsCompleted}</p>
              <p className="text-xs text-spiritual-600">Tests Done</p>
            </div>
          </div>

          <div className="text-xs text-spiritual-600 flex items-center gap-2">
            <Clock size={14} />
            <span>Last studied: {subject.lastStudied}</span>
          </div>
        </div>

        <div className="space-y-2 mt-4 pt-4 border-t border-spiritual-200">
          <Button variant="primary" size="md" fullWidth>
            Continue Learning
          </Button>
          <Button variant="secondary" size="md" fullWidth>
            Take Test
          </Button>
        </div>
      </div>
    </motion.div>
  )

  const stats = [
    {
      label: 'Subjects Studied',
      value: subjects.length,
      icon: <BookOpen size={24} className="text-primary-600" />,
      color: 'bg-primary-100',
    },
    {
      label: 'Average Score',
      value: (subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length).toFixed(1),
      icon: <TrendingUp size={24} className="text-success-600" />,
      color: 'bg-success-100',
    },
    {
      label: 'Total Topics',
      value: subjects.reduce((sum, s) => sum + s.topics, 0),
      icon: <BookOpen size={24} className="text-secondary-600" />,
      color: 'bg-secondary-100',
    },
    {
      label: 'Tests Completed',
      value: subjects.reduce((sum, s) => sum + s.testsCompleted, 0),
      icon: <Zap size={24} className="text-warning-600" />,
      color: 'bg-warning-100',
    },
  ]

  return (
    <Layout title="Subjects" streak={7}>
      <div className="space-y-6 px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 sm:p-6">
              <div className="flex flex-col items-center text-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color} mb-3`}>
                  {stat.icon}
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-spiritual-900">{stat.value}</p>
                <p className="text-xs sm:text-sm text-spiritual-600 mt-1">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        <Input
          placeholder="Search subjects..."
          leftIcon={<Search size={18} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        ) : (
          <Card className="py-12 text-center">
            <BookOpen size={48} className="mx-auto text-spiritual-300 mb-4" />
            <p className="text-spiritual-600 font-medium">No subjects found</p>
            <p className="text-sm text-spiritual-500 mt-1">Try adjusting your search</p>
          </Card>
        )}
      </div>
    </Layout>
  )
}

export default Subjects
