import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Users, ArrowRight } from 'lucide-react';
import { Quiz } from '../types/quiz';
import Button from './ui/button';

interface QuizCardProps {
  quiz: Quiz;
  onStart: (quiz: Quiz) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onStart }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-success-600 bg-success-100';
      case 'medium':
        return 'text-warning-600 bg-warning-100';
      case 'hard':
        return 'text-error-600 bg-error-100';
      default:
        return 'text-spiritual-600 bg-spiritual-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    // You can add different icons for different categories
    return '📖';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="quiz-card group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-2xl">
            {getCategoryIcon(quiz.category)}
          </div>
          <div>
            <h3 className="font-semibold text-spiritual-900 group-hover:text-primary-600 transition-colors">
              {quiz.title}
            </h3>
            <p className="text-sm text-spiritual-500 capitalize">{quiz.category.replace('-', ' ')}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(quiz.difficulty)}`}>
          {quiz.difficulty}
        </span>
      </div>

      <p className="text-spiritual-600 text-sm mb-4 line-clamp-2">
        {quiz.description}
      </p>

      <div className="flex items-center justify-between text-sm text-spiritual-500 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{quiz.timeLimit ? `${Math.floor(quiz.timeLimit / 60)}m` : 'No limit'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>{quiz.totalPoints} pts</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{quiz.questions.length} questions</span>
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        className="w-full group"
        onClick={() => onStart(quiz)}
      >
        <span>Start Quiz</span>
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};

export default QuizCard;