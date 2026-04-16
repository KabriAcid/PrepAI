import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizActionModals from '@/components/quiz/QuizActionModals';
import QuizHeader from '@/components/quiz/QuizHeader';
import QuizQuestionPanel from '@/components/quiz/QuizQuestionPanel';
import QuizSidebar from '@/components/quiz/QuizSidebar';
import {
  buildQuizFromSetup,
  buildSubjectTabs,
  formatTime,
} from '@/components/quiz/quizUtils';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/button';
import { useQuiz } from '@/context/QuizContext';
import {
  COMPULSORY_SUBJECT,
  createExamSetup,
  loadExamSetup,
} from '@/utils/exam-setup';

const FALLBACK_SUBJECTS = ['Mathematics', 'Biology', 'Chemistry'];

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    currentQuiz,
    currentQuestionIndex,
    answers,
    timeRemaining,
    isCompleted,
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    setTimeRemaining,
    completeQuiz,
    resetQuiz,
    getCurrentQuestion,
  } = useQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState<string | number>('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiInsight, setShowAiInsight] = useState(false);
  const [visitedQuestions, setVisitedQuestions] = useState<number[]>([0]);

  const currentQuestion = getCurrentQuestion();

  const routeSetup = (
    location.state as { examSetup?: { selectedSubjects?: string[] } } | null
  )?.examSetup;

  const selectedSubjects = useMemo(() => {
    const fromRoute = routeSetup?.selectedSubjects;
    if (fromRoute && fromRoute.length > 0) return fromRoute;

    const fromStorage = loadExamSetup()?.selectedSubjects;
    if (fromStorage && fromStorage.length > 0) return fromStorage;

    return createExamSetup(FALLBACK_SUBJECTS).selectedSubjects;
  }, [routeSetup]);

  const mockQuiz = useMemo(
    () => buildQuizFromSetup(selectedSubjects),
    [selectedSubjects],
  );

  const subjectTabs = useMemo(
    () => buildSubjectTabs(selectedSubjects),
    [selectedSubjects],
  );

  useEffect(() => {
    if (!currentQuiz || currentQuiz.id !== mockQuiz.id) {
      startQuiz(mockQuiz);
    }
  }, [currentQuiz, mockQuiz, startQuiz]);

  useEffect(() => {
    if (!currentQuiz || isCompleted) return;
    if (timeRemaining <= 0) {
      completeQuiz();
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [currentQuiz, isCompleted, timeRemaining, setTimeRemaining, completeQuiz]);

  useEffect(() => {
    if (!currentQuestion) return;

    const savedAnswer = answers[currentQuestion.id];
    setSelectedAnswer(savedAnswer ?? '');
    setShowAiInsight(false);
    setAiLoading(false);
  }, [currentQuestionIndex, answers, currentQuestion?.id]);

  useEffect(() => {
    setVisitedQuestions((prev) =>
      prev.includes(currentQuestionIndex)
        ? prev
        : [...prev, currentQuestionIndex],
    );
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answer: string | number) => {
    if (!currentQuestion) return;
    setSelectedAnswer(answer);
    answerQuestion(currentQuestion.id, answer);
  };

  const handleNext = () => {
    if (!currentQuiz) return;
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      nextQuestion();
    }
  };

  const handleSubmit = () => {
    completeQuiz();
    setShowConfirmModal(false);
  };

  const handleQuit = () => {
    resetQuiz();
    setShowQuitModal(false);
    navigate('/student/dashboard');
  };

  const handleExplainWithAI = () => {
    if (!currentQuestion) return;

    const optionText =
      currentQuestion.type === 'mcq' &&
        currentQuestion.choices &&
        typeof currentQuestion.correctAnswer === 'number'
        ? currentQuestion.choices[currentQuestion.correctAnswer]
        : String(currentQuestion.correctAnswer);

    const hasAnswered = selectedAnswer !== '';
    const isCorrect = hasAnswered && selectedAnswer === currentQuestion.correctAnswer;

    const insight = [
      `AI Explanation: ${currentQuestion.explanation || 'The best answer is the option that most directly satisfies the grammar, concept, or fact tested in this question.'}`,
      hasAnswered
        ? isCorrect
          ? 'Great choice. Your selected answer matches the correct option.'
          : `Your current answer is not the best fit. The correct answer is: ${optionText}.`
        : `Tip: Focus on key words in the question stem. The correct answer is: ${optionText}.`,
      'Exam strategy: Eliminate obviously wrong options first, then compare the remaining options against the exact wording of the question.',
    ].join(' ');

    setAiLoading(true);
    setShowAiInsight(true);

    window.setTimeout(() => {
      setAiInsight(insight);
      setAiLoading(false);
    }, 1200);
  };

  if (!currentQuiz || !currentQuestion) {
    return (
      <Layout title="Take Exam" streak={7}>
        <div className="px-3 sm:px-6 lg:px-8">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
              <p className="text-spiritual-600">Loading quiz...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = currentQuiz.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const timerProgress = Math.max(
    0,
    Math.min(100, (timeRemaining / (currentQuiz.timeLimit || 1)) * 100),
  );

  const activeSubject =
    subjectTabs.find(
      (tab) =>
        currentQuestionIndex >= tab.startIndex &&
        currentQuestionIndex <= tab.endIndex,
    )?.subject ?? COMPULSORY_SUBJECT;

  if (isCompleted) {
    return (
      <Layout title="Take Exam" streak={7}>
        <div className="px-3 sm:px-6 lg:px-8">
          <div className="min-h-[60vh] flex items-center justify-center p-1 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg bg-white/95 rounded-3xl p-6 sm:p-8 shadow-strong text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-success-500 to-success-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-spiritual-900 mb-2">Exam Summary</h2>
              <p className="text-spiritual-600 mb-6">Your responses have been recorded successfully.</p>

              <div className="mb-6 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-primary-700 font-semibold">
                Questions Answered: {answeredCount}/{totalQuestions}
              </div>

              <div className="space-y-3">
                <Button variant="primary" className="w-full" onClick={() => navigate('/student/results')}>
                  View Results
                </Button>
                <Button variant="secondary" className="w-full" onClick={() => navigate('/student/dashboard')}>
                  Return to Dashboard
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Take Exam" streak={7}>
      <div className="px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-2 sm:pb-8">
        <div className="w-full">
          <QuizHeader
            timeRemaining={timeRemaining}
            timerProgress={timerProgress}
            formattedTime={formatTime(timeRemaining)}
          />

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4 sm:gap-6">
            <QuizQuestionPanel
              subjectTabs={subjectTabs}
              activeSubject={activeSubject}
              onGoToQuestion={goToQuestion}
              currentQuestion={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              onExplainWithAI={handleExplainWithAI}
              showAiInsight={showAiInsight}
              aiLoading={aiLoading}
              aiInsight={aiInsight}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              isLastQuestion={isLastQuestion}
              onPrevious={previousQuestion}
              onNext={handleNext}
            />

            <QuizSidebar
              currentQuiz={currentQuiz}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              visitedQuestions={visitedQuestions}
              onGoToQuestion={goToQuestion}
              onOpenQuit={() => setShowQuitModal(true)}
              onOpenSubmit={() => setShowConfirmModal(true)}
            />
          </div>
        </div>

        <QuizActionModals
          showConfirmModal={showConfirmModal}
          showQuitModal={showQuitModal}
          onCloseConfirm={() => setShowConfirmModal(false)}
          onCloseQuit={() => setShowQuitModal(false)}
          onSubmit={handleSubmit}
          onQuit={handleQuit}
        />
      </div>
    </Layout>
  );
};

export default Quiz;
