import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/button';
import { Question } from '@/types/quiz';
import { SubjectTab } from './quizUtils';

type QuizQuestionPanelProps = {
    subjectTabs: SubjectTab[];
    activeSubject: string;
    onGoToQuestion: (index: number) => void;
    currentQuestion: Question;
    selectedAnswer: string | number;
    onAnswerSelect: (answer: string | number) => void;
    onExplainWithAI: () => void;
    showAiInsight: boolean;
    aiLoading: boolean;
    aiInsight: string;
    currentQuestionIndex: number;
    totalQuestions: number;
    isLastQuestion: boolean;
    onPrevious: () => void;
    onNext: () => void;
};

export default function QuizQuestionPanel({
    subjectTabs,
    activeSubject,
    onGoToQuestion,
    currentQuestion,
    selectedAnswer,
    onAnswerSelect,
    onExplainWithAI,
    showAiInsight,
    aiLoading,
    aiInsight,
    currentQuestionIndex,
    totalQuestions,
    isLastQuestion,
    onPrevious,
    onNext,
}: QuizQuestionPanelProps) {
    return (
        <div className="space-y-6">
            <div className="quiz-card py-3 sm:py-4">
                <div className="flex flex-wrap gap-2">
                    {subjectTabs.map((tab) => (
                        <button
                            key={tab.subject}
                            type="button"
                            onClick={() => onGoToQuestion(tab.startIndex)}
                            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${tab.subject === activeSubject
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-spiritual-100 text-spiritual-700 hover:bg-spiritual-200'
                                }`}
                        >
                            {tab.subject}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="quiz-card"
                >
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-spiritual-900 mb-2">
                                {currentQuestion.question}
                            </h2>

                            {currentQuestion.arabicText && (
                                <p className="text-lg font-arabic text-right text-spiritual-700 bg-spiritual-50 p-4 rounded-xl">
                                    {currentQuestion.arabicText}
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={onExplainWithAI}
                                className="mt-2 inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100"
                            >
                                <Sparkles className="h-4 w-4" />
                                Explain with AI
                            </button>
                        </div>

                        <div className="space-y-3">
                            {currentQuestion.type === 'mcq' && currentQuestion.choices && (
                                <>
                                    {currentQuestion.choices.map((choice, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => onAnswerSelect(index)}
                                            className={`w-full p-4 text-left rounded-xl border-2 transition-colors ${selectedAnswer === index
                                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                    : 'border-spiritual-200 bg-white hover:border-spiritual-300'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index
                                                            ? 'border-primary-500 bg-primary-500'
                                                            : 'border-spiritual-300'
                                                        }`}
                                                >
                                                    {selectedAnswer === index && (
                                                        <div className="w-2 h-2 bg-white rounded-full" />
                                                    )}
                                                </div>
                                                <span className="font-medium">{choice}</span>
                                            </div>
                                        </button>
                                    ))}
                                </>
                            )}

                            {currentQuestion.type === 'fill-blank' && (
                                <div>
                                    <input
                                        type="text"
                                        value={selectedAnswer as string}
                                        onChange={(e) => onAnswerSelect(e.target.value)}
                                        placeholder="Type your answer here..."
                                        className="input-field text-lg"
                                    />
                                </div>
                            )}
                        </div>

                        {showAiInsight && (
                            <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4 text-sm leading-relaxed text-spiritual-700">
                                {aiLoading ? (
                                    <div className="space-y-2 animate-pulse">
                                        <div className="h-3 w-full rounded bg-secondary-200" />
                                        <div className="h-3 w-5/6 rounded bg-secondary-200" />
                                        <div className="h-3 w-4/6 rounded bg-secondary-200" />
                                    </div>
                                ) : (
                                    aiInsight
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-spiritual-600">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </p>

                <div className="flex gap-3 sm:justify-end">
                    <Button variant="secondary" onClick={onPrevious} disabled={currentQuestionIndex === 0}>
                        Previous
                    </Button>

                    <Button variant="primary" onClick={onNext} disabled={isLastQuestion}>
                        {isLastQuestion ? (
                            'Last Question Reached'
                        ) : (
                            <>
                                Next
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
