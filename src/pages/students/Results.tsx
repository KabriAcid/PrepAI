import React, { useState } from 'react'
import { BarChart3, Calendar, Search, Download, Filter, CheckCircle, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import Input from '@/components/ui/input'
import ProgressBar from '@/components/ui/ProgressBar'

const Results: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date')

  const results = [
    {
      id: 1,
      exam: 'JAMB Mathematics Mock',
      subject: 'Mathematics',
      date: new Date('2025-11-15'),
      score: 85,
      total: 100,
      percentage: 85,
      status: 'passed',
      duration: '2 hours',
      questions: 40,
      timeSpent: '1h 45m',
    },
    {
      id: 2,
      exam: 'English Literature Practice',
      subject: 'English',
      date: new Date('2025-11-14'),
      score: 72,
      total: 100,
      percentage: 72,
      status: 'passed',
      duration: '3 hours',
      questions: 50,
      timeSpent: '2h 30m',
    },
    {
      id: 3,
      exam: 'Physics Fundamentals',
      subject: 'Physics',
      date: new Date('2025-11-13'),
      score: 55,
      total: 100,
      percentage: 55,
      status: 'failed',
      duration: '2 hours',
      questions: 40,
      timeSpent: '1h 50m',
    },
    {
      id: 4,
      exam: 'Chemistry Advanced Topics',
      subject: 'Chemistry',
      date: new Date('2025-11-12'),
      score: 88,
      total: 100,
      percentage: 88,
      status: 'passed',
      duration: '2.5 hours',
      questions: 45,
      timeSpent: '2h 15m',
    },
    {
      id: 5,
      exam: 'Biology Cell Structure',
      subject: 'Biology',
      date: new Date('2025-11-11'),
      score: 92,
      total: 100,
      percentage: 92,
      status: 'passed',
      duration: '2 hours',
      questions: 40,
      timeSpent: '1h 40m',
    },
    {
      id: 6,
      exam: 'Mathematics Algebra Test',
      subject: 'Mathematics',
      date: new Date('2025-11-10'),
      score: 68,
      total: 100,
      percentage: 68,
      status: 'passed',
      duration: '1.5 hours',
      questions: 30,
      timeSpent: '1h 25m',
    },
  ]

  const subjects = Array.from(new Set(results.map(r => r.subject)))

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = !selectedSubject || result.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === 'date') {
      return b.date.getTime() - a.date.getTime()
    } else {
      return b.percentage - a.percentage
    }
  })

  const stats = {
    totalTests: results.length,
    averageScore: (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(1),
    passedTests: results.filter(r => r.status === 'passed').length,
    passRate: ((results.filter(r => r.status === 'passed').length / results.length) * 100).toFixed(1),
  }

  const ResultCard: React.FC<any> = ({ result, expandable = true }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-spiritual-200 rounded-lg sm:rounded-xl overflow-hidden hover:shadow-medium transition-all duration-300"
      >
        <div
          className="p-4 sm:p-6 cursor-pointer"
          onClick={() => expandable && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className={`rounded-full p-2 ${result.status === 'passed' ? 'bg-success-100' : 'bg-error-100'}`}>
                  {result.status === 'passed' ? (
                    <CheckCircle size={20} className="text-success-600" />
                  ) : (
                    <XCircle size={20} className="text-error-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-spiritual-900">{result.exam}</p>
                  <p className="text-xs sm:text-sm text-spiritual-600">{result.date.toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className={`text-2xl sm:text-3xl font-bold ${result.percentage >= 70 ? 'text-success-600' : 'text-error-600'}`}>
                {result.percentage}%
              </p>
              <Badge variant={result.percentage >= 70 ? 'success' : 'error'} size="sm">
                {result.status === 'passed' ? 'Passed' : 'Failed'}
              </Badge>
            </div>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-spiritual-200 space-y-3"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <p className="text-xs text-spiritual-600">Score</p>
                  <p className="font-bold text-spiritual-900">{result.score}/{result.total}</p>
                </div>
                <div>
                  <p className="text-xs text-spiritual-600">Questions</p>
                  <p className="font-bold text-spiritual-900">{result.questions}</p>
                </div>
                <div>
                  <p className="text-xs text-spiritual-600">Duration</p>
                  <p className="font-bold text-spiritual-900">{result.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-spiritual-600">Time Spent</p>
                  <p className="font-bold text-spiritual-900">{result.timeSpent}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-spiritual-700">Score Progress</span>
                  <span className="text-sm font-bold text-spiritual-900">{result.percentage}%</span>
                </div>
                <ProgressBar value={result.percentage} showLabel={false} animated={false} />
              </div>

              <Button variant="secondary" fullWidth size="sm">
                Review Answers
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <Layout title="Results" streak={7}>
      <div className="space-y-6 px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-3xl sm:text-4xl font-bold text-primary-600">{stats.totalTests}</p>
            <p className="text-xs sm:text-sm text-spiritual-600 mt-1">Total Tests</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-3xl sm:text-4xl font-bold text-success-600">{stats.averageScore}%</p>
            <p className="text-xs sm:text-sm text-spiritual-600 mt-1">Average Score</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-3xl sm:text-4xl font-bold text-secondary-600">{stats.passedTests}</p>
            <p className="text-xs sm:text-sm text-spiritual-600 mt-1">Passed</p>
          </Card>
          <Card className="p-4 sm:p-6 text-center">
            <p className="text-3xl sm:text-4xl font-bold text-warning-600">{stats.passRate}%</p>
            <p className="text-xs sm:text-sm text-spiritual-600 mt-1">Pass Rate</p>
          </Card>
        </div>

        <div className="space-y-4 lg:flex lg:gap-4 lg:space-y-0">
          <Input
            placeholder="Search results..."
            leftIcon={<Search size={18} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="lg:flex-1"
          />
          <div className="flex gap-2">
            <Button variant="primary" leftIcon={<Filter size={18} />} size="md">
              Filters
            </Button>
            <Button variant="primary" leftIcon={<Download size={18} />} size="md">
              Export
            </Button>
          </div>
        </div>

        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between mb-6">
            <h3 className="font-bold text-spiritual-900">Filters</h3>
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedSubject || ''}
                onChange={(e) => setSelectedSubject(e.target.value || null)}
                className="select-field w-full sm:w-auto"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
                className="select-field w-full sm:w-auto"
              >
                <option value="date">Sort by Date</option>
                <option value="score">Sort by Score</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {sortedResults.length > 0 ? (
            sortedResults.map((result) => (
              <ResultCard key={result.id} result={result} expandable={true} />
            ))
          ) : (
            <Card className="py-12 text-center">
              <BarChart3 size={48} className="mx-auto text-spiritual-300 mb-4" />
              <p className="text-spiritual-600 font-medium">No results found</p>
              <p className="text-sm text-spiritual-500 mt-1">Take your first exam to see results here</p>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Results
