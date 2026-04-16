import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Flag, CheckCircle } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { Question, Quiz as QuizType } from '../types/quiz';
import Button from '../components/ui/button';
import ScoreBoard from '../components/ScoreBoard';
import Modal from '../components/ui/Modal';

const Quiz: React.FC = () => {
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

  // Mock quiz data - in real app, this would come from API
  const mockQuiz: QuizType = {
    id: '1',
    title: 'Quran Knowledge Test',
    description: 'Test your knowledge of the Holy Quran',
    timeLimit: 600, // 10 minutes
    category: 'quran',
    difficulty: 'medium',
    totalPoints: 500,
    questions: [
      {
        id: '1',
        type: 'mcq',
        question: 'How many chapters (Surahs) are there in the Quran?',
        choices: ['112', '113', '114', '115'],
        correctAnswer: 2,
        explanation: 'The Quran contains 114 chapters (Surahs).',
        difficulty: 'easy',
        category: 'quran',
        points: 10,
      },
      {
        id: '2',
        type: 'mcq',
        question: 'Which Surah is known as the "Heart of the Quran"?',
        choices: ['Al-Fatiha', 'Yasin', 'Al-Baqarah', 'Al-Ikhlas'],
        correctAnswer: 1,
        explanation: 'Surah Yasin is often referred to as the "Heart of the Quran".',
        difficulty: 'medium',
        category: 'quran',
        points: 15,
      },
      {
        id: '3',
        type: 'fill-blank',
        question: 'Complete the verse: "And whoever relies upon Allah - then He is _______ for him."',
        correctAnswer: 'sufficient',
        explanation: 'The complete verse is from Surah At-Talaq (65:3).',
        difficulty: 'medium',
        category: 'quran',
        points: 20,
      },
    ],
  };

  // Initialize quiz on component mount
  useEffect(() => {
    if (!currentQuiz) {
      startQuiz(mockQuiz);
    }
  }, [currentQuiz, startQuiz]);

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