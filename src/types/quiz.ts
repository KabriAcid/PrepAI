export interface Question {
  id: string;
  type: 'mcq' | 'fill-blank' | 'audio' | 'surah-guess';
  question: string;
  arabicText?: string;
  audioUrl?: string;
  choices?: string[];
  correctAnswer: string | number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'quran' | 'hadith' | 'islamic-history' | 'prophets';
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number; // in seconds
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  totalPoints: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId?: string;
  answers: Record<string, string | number>;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: Date;
}

export interface QuizState {
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  answers: Record<string, string | number>;
  timeRemaining: number;
  isCompleted: boolean;
  score: number;
  startTime: Date | null;
}