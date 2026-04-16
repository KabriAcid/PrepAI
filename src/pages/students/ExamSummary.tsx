import React, { useEffect } from 'react'
import { ArrowLeft, Play, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import {
    COMPULSORY_SUBJECT,
    QUESTION_DISTRIBUTION,
    loadExamSetup,
} from '@/utils/exam-setup'

const ExamSummary: React.FC = () => {
    const navigate = useNavigate()
    const setup = loadExamSetup()

    useEffect(() => {
        if (!setup) {
            navigate('/student/exams/subjects', { replace: true })
        }
    }, [setup, navigate])

    if (!setup) return null

    const allSubjects = [COMPULSORY_SUBJECT, ...setup.selectedSubjects]

    const handleStartExam = () => {
        navigate('/student/quiz', {
            state: {
                examSetup: setup,
            },
        })
    }

    return (
        <Layout title="Take Exam" streak={7}>
            <div className="space-y-6 px-3 sm:px-6 lg:px-8">
                <Card className="p-5 sm:p-6 lg:p-8">
                    <h2 className="text-xl font-bold text-spiritual-900 sm:text-2xl">
                        Exam Summary
                    </h2>
                    <p className="mt-1 text-sm text-spiritual-600 sm:text-base">
                        Review your selection and start your CBT mock exam.
                    </p>

                    <div className="mt-5 rounded-xl border border-spiritual-200 p-4 sm:p-5">
                        <p className="mb-2 text-sm font-semibold text-spiritual-800 sm:text-base">
                            You have selected the following subjects:
                        </p>
                        <ul className="space-y-2 text-sm text-spiritual-700 sm:text-base">
                            {allSubjects.map((subject) => (
                                <li key={subject} className="flex items-center gap-2">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500" />
                                    {subject}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 rounded-xl border border-primary-200 bg-primary-50 p-4 sm:p-5">
                        <p className="text-sm text-spiritual-800 sm:text-base">
                            <strong>Total Number of Questions:</strong> {setup.totalQuestions}
                        </p>
                        <p className="mt-1 text-sm text-spiritual-800 sm:text-base">
                            <strong>Total Time Given:</strong> {setup.totalTimeMinutes} mins
                        </p>
                        <p className="mt-2 text-xs text-primary-700 sm:text-sm">
                            {COMPULSORY_SUBJECT}: {QUESTION_DISTRIBUTION[COMPULSORY_SUBJECT]} questions, each selected subject: {QUESTION_DISTRIBUTION.additionalSubject} questions.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Button
                            variant="primary"
                            onClick={handleStartExam}
                            leftIcon={<Play size={16} />}
                        >
                            Start Exam
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/student/exams/subjects')}
                            leftIcon={<ArrowLeft size={16} />}
                        >
                            Change Subjects
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/student/dashboard')}
                            leftIcon={<XCircle size={16} />}
                        >
                            Quit
                        </Button>
                    </div>
                </Card>
            </div>
        </Layout>
    )
}

export default ExamSummary
