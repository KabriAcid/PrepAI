import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Flag,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/button';
import { useQuiz } from '@/context/QuizContext';
import { Question, Quiz as QuizType } from '@/types/quiz';
import {
  COMPULSORY_SUBJECT,
  QUESTION_DISTRIBUTION,
  createExamSetup,
  loadExamSetup,
} from '@/utils/exam-setup';

type QuestionTemplate = {
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
};

const SUBJECT_TEMPLATES: Record<string, QuestionTemplate[]> = {
  [COMPULSORY_SUBJECT]: [
    {
      question:
        'Choose the option that best completes the sentence: The chairman, together with his aides, ___ arriving shortly.',
      choices: ['are', 'were', 'is', 'have'],
      correctAnswer: 2,
      explanation:
        'The subject is "chairman" (singular), so the correct verb is "is".',
    },
    {
      question: 'Identify the correctly punctuated sentence.',
      choices: [
        'After the game we went home.',
        'After the game, we went home.',
        'After, the game we went home.',
        'After the game we, went home.',
      ],
      correctAnswer: 1,
      explanation:
        'A comma follows an introductory phrase: "After the game, ..."',
    },
  ],
  Mathematics: [
    {
      question: 'If 3x + 5 = 20, find x.',
      choices: ['3', '4', '5', '6'],
      correctAnswer: 2,
      explanation: '3x = 15, so x = 5.',
    },
    {
      question: 'What is the value of 7^2 - 5^2?',
      choices: ['12', '20', '24', '49'],
      correctAnswer: 2,
      explanation: '49 - 25 = 24.',
    },
  ],
  Biology: [
    {
      question:
        'Which organelle is responsible for energy production in cells?',
      choices: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Vacuole'],
      correctAnswer: 1,
      explanation:
        'Mitochondria are the site of ATP production during respiration.',
    },
    {
      question: 'The process by which green plants make food is called:',
      choices: ['Respiration', 'Diffusion', 'Photosynthesis', 'Transpiration'],
      correctAnswer: 2,
      explanation:
        'Photosynthesis uses sunlight, carbon dioxide and water to form glucose.',
    },
  ],
  Chemistry: [
    {
      question: 'The pH of a neutral solution at room temperature is:',
      choices: ['1', '7', '10', '14'],
      correctAnswer: 1,
      explanation: 'A neutral aqueous solution has pH 7.',
    },
    {
      question: 'Which particle has a negative charge?',
      choices: ['Proton', 'Neutron', 'Electron', 'Nucleus'],
      correctAnswer: 2,
      explanation: 'Electrons carry negative charge.',
    },
  ],
  Physics: [
    {
      question: 'The SI unit of force is:',
      choices: ['Joule', 'Pascal', 'Newton', 'Watt'],
      correctAnswer: 2,
      explanation: 'Force is measured in newtons (N).',
    },
    {
      question: 'Speed is defined as distance divided by:',
      choices: ['Time', 'Mass', 'Acceleration', 'Force'],
      correctAnswer: 0,
      explanation: 'Speed = distance / time.',
    },
  ],
};

const FALLBACK_SUBJECTS = ['Mathematics', 'Biology', 'Chemistry'];

const getTemplatesForSubject = (subject: string): QuestionTemplate[] =>
  SUBJECT_TEMPLATES[subject] ?? SUBJECT_TEMPLATES[COMPULSORY_SUBJECT];

const buildExamQuestions = (
  subject: string,
  count: number,
  prefix: string,
): Question[] => {
  const templates = getTemplatesForSubject(subject);
  return Array.from({ length: count }, (_, i) => {
    const template = templates[i % templates.length];
    return {
      id: `${prefix}-${i + 1}`,
      type: 'mcq',
      question: `${subject}: ${template.question}`,
      choices: template.choices,
      correctAnswer: template.correctAnswer,
      explanation: template.explanation,
      difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard',
      category: 'quran',
      points: 2,
    };
  });
};

const buildQuizFromSetup = (selectedSubjects: string[]): QuizType => {
  const questions: Question[] = [
    ...buildExamQuestions(
      COMPULSORY_SUBJECT,
      QUESTION_DISTRIBUTION[COMPULSORY_SUBJECT],
      'english',
    ),
    ...selectedSubjects.flatMap((subject) =>
      buildExamQuestions(
        subject,
        QUESTION_DISTRIBUTION.additionalSubject,
        subject.toLowerCase().replace(/\s+/g, '-'),
      ),
    ),
  ];

  return {
    id: `jamb-${selectedSubjects.join('-').toLowerCase().replace(/\s+/g, '-')}`,
    title: 'JAMB Mock CBT',
    description: 'AI-powered mock exam simulation',
    timeLimit: 35 * 60,
    category: 'jamb-cbt',
    difficulty: 'medium',
    totalPoints: questions.length * 2,
    questions,
  };
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(Math.max(seconds, 0) / 60);
  const secs = Math.max(seconds, 0) % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    setTimeRemaining,
    completeQuiz,
    resetQuiz,
    getCurrentQuestion,
    getProgress,
  } = useQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState<string | number>('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const [showAiInsight, setShowAiInsight] = useState(false);

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
    const question = getCurrentQuestion();
    if (question) {
      const savedAnswer = answers[question.id];
      setSelectedAnswer(savedAnswer || '');
      setShowAiInsight(false);
    }
  }, [currentQuestionIndex, answers, getCurrentQuestion]);

  const currentQuestion = getCurrentQuestion();

  const handleAnswerSelect = (answer: string | number) => {
    if (!currentQuestion) return;
    setSelectedAnswer(answer);
    answerQuestion(currentQuestion.id, answer);
  };

  const handleNext = () => {
    if (!currentQuiz) return;
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      nextQuestion();
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleSubmit = () => {
    completeQuiz();
    setShowConfirmModal(false);
  };

  const handleQuit = () => {
    resetQuiz();
    setShowQuitModal(false);
    navigate('/student/exams/summary');
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

    setAiInsight(insight);
    setShowAiInsight(true);
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
  const canGoNext = selectedAnswer !== '';
  const timerProgress = Math.max(
    0,
    Math.min(100, (timeRemaining / (currentQuiz.timeLimit || 1)) * 100),
  );

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
              <h2 className="text-2xl font-bold text-spiritual-900 mb-2">Exam Submitted</h2>
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
          <div className="mb-4 rounded-2xl border border-primary-200 bg-primary-50 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-spiritual-900">JAMB Mock CBT</h1>
                <p className="text-sm sm:text-base text-spiritual-600">
                  Answer all questions before submitting your exam.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs uppercase tracking-wider font-semibold text-primary-700">Time Remaining</p>
                <motion.p
                  key={timeRemaining}
                  initial={{ opacity: 0.6, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-3xl sm:text-5xl font-extrabold leading-none ${timeRemaining <= 60 ? 'text-error-600 animate-pulse' : 'text-primary-600'}`}
                >
                  {formatTime(timeRemaining)}
                </motion.p>
              </div>
            </div>

            <div className="mt-4 h-2 rounded-full bg-primary-100 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                animate={{ width: `${timerProgress}%` }}
                transition={{ duration: 0.8, ease: 'linear' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4 sm:gap-6">
            <div className="space-y-6">
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
                        onClick={handleExplainWithAI}
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
                              onClick={() => handleAnswerSelect(index)}
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
                            onChange={(e) => handleAnswerSelect(e.target.value)}
                            placeholder="Type your answer here..."
                            className="input-field text-lg"
                          />
                        </div>
                      )}
                    </div>

                    {showAiInsight && (
                      <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4 text-sm leading-relaxed text-spiritual-700">
                        {aiInsight}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  variant="secondary"
                  onClick={() => setShowQuitModal(true)}
                  leftIcon={<XCircle className="w-4 h-4" />}
                >
                  Quit Exam
                </Button>

                <div className="flex gap-3 sm:justify-end">
                  <Button
                    variant="secondary"
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>

                  <Button variant="primary" onClick={handleNext} disabled={!canGoNext}>
                    {isLastQuestion ? (
                      <>
                        <Flag className="w-4 h-4 mr-2" />
                        Submit Quiz
                      </>
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

            <div className="space-y-4">
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
                  {currentQuiz.questions.map((_, index) => (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${index === currentQuestionIndex
                          ? 'bg-primary-500 text-white'
                          : answers[currentQuiz.questions[index].id]
                            ? 'bg-success-100 text-success-700 border border-success-300'
                            : 'bg-spiritual-100 text-spiritual-600 hover:bg-spiritual-200'
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="Submit Quiz"
        >
          <div className="space-y-4">
            <p className="text-spiritual-600">
              Are you sure you want to submit your quiz? You will not be able to
              change your answers after submission.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="secondary"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1"
              >
                Continue Exam
              </Button>
              <Button variant="primary" onClick={handleSubmit} className="flex-1">
                Submit Now
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showQuitModal}
          onClose={() => setShowQuitModal(false)}
          title="Quit Exam"
        >
          <div className="space-y-4">
            <p className="text-spiritual-600">
              You are about to leave this exam session. Any unanswered questions will remain unanswered.
              Do you want to quit?
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="secondary"
                onClick={() => setShowQuitModal(false)}
                className="flex-1"
              >
                Stay in Exam
              </Button>
              <Button variant="danger" onClick={handleQuit} className="flex-1">
                Yes, Quit
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Quiz;
