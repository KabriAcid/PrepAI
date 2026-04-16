import React, { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckSquare, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import {
    ADDITIONAL_SUBJECTS_REQUIRED,
    AVAILABLE_SUBJECTS,
    COMPULSORY_SUBJECT,
    createExamSetup,
    loadExamSetup,
    saveExamSetup,
} from '@/utils/exam-setup'

const ExamSubjectSelection: React.FC = () => {
    const navigate = useNavigate()
    const initialSetup = loadExamSetup()

    const [query, setQuery] = useState('')
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
        initialSetup?.selectedSubjects ?? [],
    )

    const filteredSubjects = useMemo(() => {
        return AVAILABLE_SUBJECTS.filter((subject) =>
            subject.toLowerCase().includes(query.toLowerCase()),
        )
    }, [query])

    const remaining = ADDITIONAL_SUBJECTS_REQUIRED - selectedSubjects.length
    const canProceed = remaining === 0

    const toggleSubject = (subject: string) => {
        const exists = selectedSubjects.includes(subject)
        if (exists) {
            setSelectedSubjects((prev) => prev.filter((item) => item !== subject))
            return
        }

        if (selectedSubjects.length >= ADDITIONAL_SUBJECTS_REQUIRED) return
        setSelectedSubjects((prev) => [...prev, subject])
    }

    const handleContinue = () => {
        const setup = createExamSetup(selectedSubjects)
        saveExamSetup(setup)
        navigate('/student/exams/summary')
    }

    return (
        <Layout title="Take Exam" streak={7}>
            <div className="space-y-6 px-3 sm:px-6 lg:px-8">
                <Card className="p-5 sm:p-6 lg:p-8">
                    <div className="mb-5 flex items-start gap-3">
                        <div className="rounded-xl bg-primary-100 p-2 text-primary-600">
                            <CheckSquare size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-spiritual-900 sm:text-2xl">
                                Select Subjects
                            </h2>
                            <p className="mt-1 text-sm text-spiritual-600 sm:text-base">
                                Choose {ADDITIONAL_SUBJECTS_REQUIRED} additional subjects. {COMPULSORY_SUBJECT} is already included.
                            </p>
                        </div>
                    </div>

                    <div className="mb-4 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-700 sm:text-base">
                        <span className="font-semibold">Compulsory:</span> {COMPULSORY_SUBJECT}
                    </div>

                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-3.5 h-5 w-5 text-spiritual-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search subjects..."
                            className="input-field-icon"
                        />
                    </div>

                    <div className="mb-4 rounded-xl border border-spiritual-200 p-4">
                        <p className="text-sm text-spiritual-700 sm:text-base">
                            {canProceed
                                ? 'Great. Your subject selection is complete.'
                                : `Select ${remaining} more subject${remaining > 1 ? 's' : ''} to continue.`}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredSubjects.map((subject) => {
                            const checked = selectedSubjects.includes(subject)
                            const disabled =
                                !checked && selectedSubjects.length >= ADDITIONAL_SUBJECTS_REQUIRED

                            return (
                                <label
                                    key={subject}
                                    className={`flex items-center gap-3 rounded-xl border p-3 text-sm transition-all sm:text-base ${checked
                                            ? 'border-primary-400 bg-primary-50 text-primary-700'
                                            : disabled
                                                ? 'cursor-not-allowed border-spiritual-200 bg-spiritual-50 text-spiritual-400'
                                                : 'cursor-pointer border-spiritual-200 bg-white hover:border-primary-300'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        disabled={disabled}
                                        onChange={() => toggleSubject(subject)}
                                        className="h-4 w-4 rounded border-spiritual-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <span>{subject}</span>
                                </label>
                            )
                        })}
                    </div>

                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/student/exams/instructions')}
                            leftIcon={<ArrowLeft size={16} />}
                        >
                            Back to Instructions
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleContinue}
                            disabled={!canProceed}
                            rightIcon={<ArrowRight size={16} />}
                        >
                            Continue to Summary
                        </Button>
                    </div>
                </Card>
            </div>
        </Layout>
    )
}

export default ExamSubjectSelection
