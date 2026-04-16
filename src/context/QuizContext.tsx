import React, { createContext, useContext, useReducer } from 'react';
import { Quiz, QuizState, Question } from '../types/quiz';

type QuizAction =
  | { type: 'START_QUIZ'; payload: Quiz }
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; answer: string | number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'SET_TIME_REMAINING'; payload: number }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' };

const initialState: QuizState = {
  currentQuiz: null,
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: 0,
  isCompleted: false,
  score: 0,
  startTime: null,
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...initialState,
        currentQuiz: action.payload,
        timeRemaining: action.payload.timeLimit || 0,
        startTime: new Date(),
      };
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          (state.currentQuiz?.questions.length || 1) - 1
        ),
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case 'SET_TIME_REMAINING':
      return {
        ...state,
        timeRemaining: action.payload,
      };
    case 'COMPLETE_QUIZ':
      const score = calculateScore(state.currentQuiz, state.answers);
      return {
        ...state,
        isCompleted: true,
        score,
      };
    case 'RESET_QUIZ':
      return initialState;
    default:
      return state;
  }
};

const calculateScore = (quiz: Quiz | null, answers: Record<string, string | number>): number => {
  if (!quiz) return 0;
  
  let totalScore = 0;
  quiz.questions.forEach((question) => {
    const userAnswer = answers[question.id];
    if (userAnswer === question.correctAnswer) {
      totalScore += question.points;
    }
  });
  
  return totalScore;
};

interface QuizContextType extends QuizState {
  startQuiz: (quiz: Quiz) => void;
  answerQuestion: (questionId: string, answer: string | number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  getCurrentQuestion: () => Question | null;
  getProgress: () => number;
  getCorrectAnswersCount: () => number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: React.ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const startQuiz = (quiz: Quiz) => {
    dispatch({ type: 'START_QUIZ', payload: quiz });
  };

  const answerQuestion = (questionId: string, answer: string | number) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { questionId, answer } });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const completeQuiz = () => {
    dispatch({ type: 'COMPLETE_QUIZ' });
  };

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  const getCurrentQuestion = (): Question | null => {
    if (!state.currentQuiz) return null;
    return state.currentQuiz.questions[state.currentQuestionIndex] || null;
  };

  const getProgress = (): number => {
    if (!state.currentQuiz) return 0;
    return ((state.currentQuestionIndex + 1) / state.currentQuiz.questions.length) * 100;
  };

  const getCorrectAnswersCount = (): number => {
    if (!state.currentQuiz) return 0;
    
    let correctCount = 0;
    state.currentQuiz.questions.forEach((question) => {
      const userAnswer = state.answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctCount++;
      }
    });
    
    return correctCount;
  };

  const value: QuizContextType = {
    ...state,
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz,
    getCurrentQuestion,
    getProgress,
    getCorrectAnswersCount,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};