import React from 'react'
import { ArrowRight, ClipboardList, Timer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import {
    ADDITIONAL_SUBJECTS_REQUIRED,
    COMPULSORY_SUBJECT,
    DEFAULT_EXAM_DURATION_MINUTES,
    QUESTION_DISTRIBUTION,
} from '@/utils/exam-setup'

const ExamInstructions: React.FC = () => {
    const navigate = useNavigate()

    return (
        <Layout title="Take Exam" streak={7}>
            <div className="space-y-6 px-3 sm:px-6 lg:px-8">
                <Card className="p-5 sm:p-6 lg:p-8">
                    <div className="mb-5 flex items-start gap-3">
                        <div className="rounded-xl bg-primary-100 p-2 text-primary-600">
                            <ClipboardList size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-spiritual-900 sm:text-2xl">
                                CBT Instructions
                            </h2>
                            <p className="mt-1 text-sm text-spiritual-600 sm:text-base">
                                Read carefully before proceeding to subject selection.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 text-sm leading-relaxed text-spiritual-700 sm:text-base">
                        <p>
                            You will answer <strong>50 questions</strong> in total: {QUESTION_DISTRIBUTION[COMPULSORY_SUBJECT]} questions from{' '}
                            <strong>{COMPULSORY_SUBJECT}</strong> and {QUESTION_DISTRIBUTION.additionalSubject} questions each from your {ADDITIONAL_SUBJECTS_REQUIRED}{' '}
                            selected subjects.
                        </p>
                        <p>
                            Questions are presented one after another. Use <strong>Next</strong> and <strong>Previous</strong> to navigate.
                            Click <strong>Submit Exam</strong> when you are done.
                        </p>
                        <p>
                            Your total exam time is{' '}
                            <strong>{DEFAULT_EXAM_DURATION_MINUTES} minutes</strong>. If time runs out, your answers are submitted automatically.
                        </p>
                        <p>
                            During the exam, you can use the AI helper icon to get a short explanation for the current question.
                        </p>
                    </div>

                    <div className="mt-6 rounded-xl border border-primary-200 bg-primary-50 p-4 text-sm text-primary-700 sm:text-base">
                        <div className="flex items-center gap-2">
                            <Timer size={18} />
                            <span className="font-semibold">Time allocation:</span>
                            <span>{DEFAULT_EXAM_DURATION_MINUTES} mins for 50 questions</span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/student/exams/subjects')}
                            rightIcon={<ArrowRight size={16} />}
                        >
                            Proceed to Subject Selection
                        </Button>
                    </div>
                </Card>
            </div>
        </Layout>
    )
}

export default ExamInstructions
