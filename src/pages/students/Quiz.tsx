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
import { useQuestionNarration } from '@/hooks/use-question-narration';
import {
  COMPULSORY_SUBJECT,
  createExamSetup,
  loadExamSetup,
} from '@/utils/exam-setup';

const FALLBACK_SUBJECTS = ['Mathematics', 'Biology', 'Chemistry'];

const getNarrationText = (
  question: ReturnType<ReturnType<typeof useQuiz>['getCurrentQuestion']>,
  readExplanation: boolean,
) => {
  if (!question) return '';

  const optionsText =
    question.type === 'mcq' && question.choices
      ? question.choices
        .map((choice, index) => `Option ${String.fromCharCode(65 + index)}. ${choice}.`)
        .join(' ')
      : '';

  const explanationText =
    readExplanation && question.explanation
      ? `Explanation: ${question.explanation}.`
      : '';

  return [
    question.question,
    question.arabicText,
    optionsText,
    explanationText,
  ]
    .filter(Boolean)
    .join(' ');
};

const getAnswerLabel = (
  question: ReturnType<ReturnType<typeof useQuiz>['getCurrentQuestion']>,
  answer: string | number | undefined,
) => {
  if (answer === undefined || answer === '') return 'Not answered';

  if (
    question?.type === 'mcq' &&
    Array.isArray(question.choices) &&
    typeof answer === 'number'
  ) {
    const choiceText = question.choices[answer];
    if (!choiceText) return `Option ${String.fromCharCode(65 + answer)}`;
    return `Option ${String.fromCharCode(65 + answer)}. ${choiceText}`;
  }

  return String(answer);
};

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
  const [readExplanation, setReadExplanation] = useState(false);

  const {
    isSupported: isNarrationSupported,
    isSpeaking: isNarrating,
    isPaused: isNarrationPaused,
    rate: narrationRate,
    setRate: setNarrationRate,
    error: narrationError,
    speak,
    pause,
    resume,
    stop,
  } = useQuestionNarration();

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
    stop();
  }, [currentQuestionIndex, answers, currentQuestion?.id]);

  useEffect(() => {
    if (isCompleted) {
      stop();
    }
  }, [isCompleted, stop]);

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
    stop();
    completeQuiz();
    setShowConfirmModal(false);
  };

  const handleQuit = () => {
    stop();
    resetQuiz();
    setShowQuitModal(false);
    navigate('/student/dashboard');
  };

  const handlePlayNarration = () => {
    const narrationText = getNarrationText(currentQuestion, readExplanation);
    speak(narrationText);
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
  const correctAnswers = currentQuiz.questions.reduce((count, question) => {
    return answers[question.id] === question.correctAnswer ? count + 1 : count;
  }, 0);
  const scorePercent = totalQuestions
    ? Math.round((correctAnswers / totalQuestions) * 100)
    : 0;
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
        <div className="px-3 sm:px-6 lg:px-8 pb-6 sm:pb-10">
          <div className="mx-auto w-full max-w-5xl space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white/95 p-5 shadow-strong sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-success-500 to-success-600">
                    <CheckCircle className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-spiritual-900">Exam Summary</h2>
                    <p className="text-spiritual-600">
                      Your responses have been recorded. Review each question below.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center sm:min-w-[280px]">
                  <div className="rounded-xl border border-primary-200 bg-primary-50 p-2">
                    <p className="text-xs text-primary-700">Answered</p>
                    <p className="text-lg font-bold text-primary-700">
                      {answeredCount}/{totalQuestions}
                    </p>
                  </div>
                  <div className="rounded-xl border border-success-200 bg-success-50 p-2">
                    <p className="text-xs text-success-700">Correct</p>
                    <p className="text-lg font-bold text-success-700">
                      {correctAnswers}/{totalQuestions}
                    </p>
                  </div>
                  <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-2">
                    <p className="text-xs text-secondary-700">Score</p>
                    <p className="text-lg font-bold text-secondary-700">{scorePercent}%</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button variant="primary" onClick={() => navigate('/student/results')}>
                  View Results
                </Button>
                <Button variant="secondary" onClick={() => navigate('/student/dashboard')}>
                  Return to Dashboard
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="quiz-card space-y-3"
            >
              <div>
                <h3 className="text-lg font-bold text-spiritual-900">Question Review</h3>
                <p className="text-sm text-spiritual-600">
                  Compare your selected answers with the correct answers and explanations.
                </p>
              </div>

              <div className="space-y-3">
                {currentQuiz.questions.map((question, index) => {
                  const selectedAnswerValue = answers[question.id];
                  const isCorrect = selectedAnswerValue === question.correctAnswer;
                  const selectedLabel = getAnswerLabel(question, selectedAnswerValue);
                  const correctLabel = getAnswerLabel(question, question.correctAnswer);

                  return (
                    <div
                      key={question.id}
                      className="rounded-2xl border border-spiritual-200 bg-white p-4"
                    >
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-spiritual-900">
                          Q{index + 1}. {question.question}
                        </p>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            isCorrect
                              ? 'bg-success-100 text-success-700'
                              : 'bg-error-100 text-error-700'
                          }`}
                        >
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>

                      <div className="space-y-1 text-sm">
                        <p className="text-spiritual-700">
                          <span className="font-semibold text-spiritual-900">Your answer:</span>{' '}
                          {selectedLabel}
                        </p>
                        <p className="text-spiritual-700">
                          <span className="font-semibold text-spiritual-900">Correct answer:</span>{' '}
                          {correctLabel}
                        </p>
                        {question.explanation && (
                          <p className="rounded-lg bg-spiritual-50 px-3 py-2 text-spiritual-700">
                            <span className="font-semibold text-spiritual-900">Explanation:</span>{' '}
                            {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
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
              onPlayNarration={handlePlayNarration}
              onPauseNarration={pause}
              onResumeNarration={resume}
              onStopNarration={stop}
              isNarrationSupported={isNarrationSupported}
              isNarrating={isNarrating}
              isNarrationPaused={isNarrationPaused}
              narrationRate={narrationRate}
              onNarrationRateChange={setNarrationRate}
              narrationError={narrationError}
              readExplanation={readExplanation}
              onReadExplanationToggle={() =>
                setReadExplanation((previous) => !previous)
              }
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
