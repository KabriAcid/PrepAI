import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Flag, CheckCircle, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Question, Quiz as QuizType } from '../types/quiz';
import Button from '../components/ui/button';
import ScoreBoard from '../components/ScoreBoard';
import Modal from '../components/ui/Modal';
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
      question: 'Choose the option that best completes the sentence: The chairman, together with his aides, ___ arriving shortly.',
      choices: ['are', 'were', 'is', 'have'],
      correctAnswer: 2,
      explanation: 'The subject is "chairman" (singular), so the correct verb is "is".',
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
      explanation: 'A comma follows an introductory phrase: "After the game, ..."',
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
      question: 'Which organelle is responsible for energy production in cells?',
      choices: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Vacuole'],
      correctAnswer: 1,
      explanation: 'Mitochondria are the site of ATP production during respiration.',
    },
    {
      question: 'The process by which green plants make food is called:',
      choices: ['Respiration', 'Diffusion', 'Photosynthesis', 'Transpiration'],
      correctAnswer: 2,
      explanation: 'Photosynthesis uses sunlight, carbon dioxide and water to form glucose.',
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

const buildExamQuestions = (subject: string, count: number, prefix: string): Question[] => {
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

const Quiz: React.FC = () => {
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
    completeQuiz,
    getCurrentQuestion,
    getProgress,
    getCorrectAnswersCount,
    score,
  } = useQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState<string | number>('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [timeWarning, setTimeWarning] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const [showAiInsight, setShowAiInsight] = useState(false);

  const routeSetup = (location.state as { examSetup?: { selectedSubjects?: string[] } } | null)?.examSetup;

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

  // Initialize quiz on component mount
  useEffect(() => {
    if (!currentQuiz || currentQuiz.id !== mockQuiz.id) {
      startQuiz(mockQuiz);
    }
  }, [currentQuiz, mockQuiz, startQuiz]);

  // Handle timer warnings
  useEffect(() => {
    if (timeRemaining <= 60 && timeRemaining > 0 && !timeWarning) {
      setTimeWarning(true);
    }
  }, [timeRemaining, timeWarning]);

  // Load saved answer when question changes
  useEffect(() => {
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      const savedAnswer = answers[currentQuestion.id];
      setSelectedAnswer(savedAnswer || '');
      setShowAiInsight(false);
    }
  }, [currentQuestionIndex, answers, getCurrentQuestion]);

  const currentQuestion = getCurrentQuestion();

  if (!currentQuiz || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-spiritual-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-strong text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-success-500 to-success-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce-gentle">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-spiritual-900 mb-2">Quiz Completed!</h2>
          <p className="text-spiritual-600 mb-6">Congratulations! You have completed the quiz.</p>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center py-2 border-b border-spiritual-200">
              <span className="text-spiritual-600">Final Score:</span>
              <span className="font-bold text-primary-600">{score} points</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-spiritual-200">
              <span className="text-spiritual-600">Correct Answers:</span>
              <span className="font-bold text-success-600">{getCorrectAnswersCount()}/{currentQuiz.questions.length}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-spiritual-600">Accuracy:</span>
              <span className="font-bold text-spiritual-900">
                {Math.round((getCorrectAnswersCount() / currentQuiz.questions.length) * 100)}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="primary" className="w-full">
              View Results
            </Button>
            <Button variant="secondary" className="w-full">
              Play Again
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(answer);
    answerQuestion(currentQuestion.id, answer);
  };

  const handleNext = () => {
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

  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;
  const canGoNext = selectedAnswer !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Quiz Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 text-spiritual-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>

              <div className="flex items-center space-x-2 text-spiritual-600">
                <Clock className="w-5 h-5" />
                <span className={`font-mono ${timeRemaining < 60 ? 'text-error-600' : ''}`}>
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-spiritual-600">
                <span>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</span>
                <span>{Math.round(getProgress())}% Complete</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgress()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question Card */}
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

                  {/* Answer Options */}
                  <div className="space-y-3">
                    {currentQuestion.type === 'mcq' && currentQuestion.choices && (
                      <>
                        {currentQuestion.choices.map((choice, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full p-4 text-left rounded-xl border-2 transition-all ${selectedAnswer === index
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-spiritual-200 bg-white hover:border-spiritual-300'
                              }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-spiritual-300'
                                }`}>
                                {selectedAnswer === index && (
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                              </div>
                              <span className="font-medium">{choice}</span>
                            </div>
                          </motion.button>
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

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="secondary"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canGoNext}
              >
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

          {/* Sidebar */}
          <div className="space-y-6">
            <ScoreBoard
              currentScore={score}
              totalQuestions={currentQuiz.questions.length}
              currentQuestion={currentQuestionIndex + 1}
              timeRemaining={timeRemaining}
              correctAnswers={getCorrectAnswersCount()}
            />

            {/* Question Navigator */}
            <div className="quiz-card">
              <h3 className="font-semibold text-spiritual-900 mb-4">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {currentQuiz.questions.map((_, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${index === currentQuestionIndex
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

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Submit Quiz"
      >
        <div className="space-y-4">
          <p className="text-spiritual-600">
            Are you sure you want to submit your quiz? You won't be able to change your answers after submission.
          </p>
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} className="flex-1">
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Quiz;