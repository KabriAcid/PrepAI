import { Flag, XCircle } from 'lucide-react';
import Button from '@/components/ui/button';
import { Quiz as QuizType } from '@/types/quiz';

type QuizSidebarProps = {
    currentQuiz: QuizType;
    currentQuestionIndex: number;
    answers: Record<string, string | number>;
    visitedQuestions: number[];
    onGoToQuestion: (index: number) => void;
    onOpenQuit: () => void;
    onOpenSubmit: () => void;
};

export default function QuizSidebar({
    currentQuiz,
    currentQuestionIndex,
    answers,
    visitedQuestions,
    onGoToQuestion,
    onOpenQuit,
    onOpenSubmit,
}: QuizSidebarProps) {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = currentQuiz.questions.length;

    return (
        <div className="space-y-4">
            <div className="quiz-card space-y-3">
                <h3 className="font-semibold text-spiritual-900">Exam Actions</h3>
                <Button
                    variant="secondary"
                    onClick={onOpenQuit}
                    leftIcon={<XCircle className="w-4 h-4" />}
                    fullWidth
                >
                    Quit Exam
                </Button>
                <Button
                    variant="primary"
                    onClick={onOpenSubmit}
                    leftIcon={<Flag className="w-4 h-4" />}
                    fullWidth
                >
                    Submit Quiz
                </Button>
            </div>

            <div className="quiz-card">
                <h3 className="font-semibold text-spiritual-900 mb-2">Questions Answered</h3>
                <p className="text-3xl font-extrabold text-primary-600 leading-none">
                    {answeredCount}/{totalQuestions}
                </p>
                <p className="mt-2 text-sm text-spiritual-600">
                    {totalQuestions - answeredCount} remaining
                </p>
            </div>

            <div className="quiz-card">
                <h3 className="font-semibold text-spiritual-900 mb-4">Questions</h3>
                <div className="grid grid-cols-5 gap-2">
                    {currentQuiz.questions.map((question, index) => (
                        <button
                            key={question.id}
                            type="button"
                            onClick={() => onGoToQuestion(index)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${index === currentQuestionIndex
                                    ? 'bg-primary-500 text-white'
                                    : answers[question.id] !== undefined
                                        ? 'bg-success-100 text-success-700 border border-success-300'
                                        : visitedQuestions.includes(index)
                                            ? 'bg-warning-100 text-warning-700 border border-warning-300'
                                            : 'bg-spiritual-100 text-spiritual-600 hover:bg-spiritual-200'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
