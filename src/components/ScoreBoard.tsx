import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Clock, Star } from 'lucide-react';

interface ScoreBoardProps {
  currentScore: number;
  totalQuestions: number;
  currentQuestion: number;
  timeRemaining?: number;
  correctAnswers: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  currentScore,
  totalQuestions,
  currentQuestion,
  timeRemaining,
  correctAnswers,
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  const accuracy = currentQuestion > 0 ? (correctAnswers / currentQuestion) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-white/20">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-primary-600 mb-1">
            <Star className="w-4 h-4" />
            <span className="text-xs font-medium">Score</span>
          </div>
          <div className="text-xl font-bold text-spiritual-900">{currentScore}</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-success-600 mb-1">
            <Target className="w-4 h-4" />
            <span className="text-xs font-medium">Accuracy</span>
          </div>
          <div className="text-xl font-bold text-spiritual-900">{Math.round(accuracy)}%</div>
        </div>
      </div>

      <div className="space-y-3">
        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-spiritual-600">Progress</span>
            <span className="text-xs text-spiritual-500">{currentQuestion}/{totalQuestions}</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Time Remaining */}
        {timeRemaining !== undefined && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-warning-600">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">Time</span>
            </div>
            <span className={`text-sm font-mono font-bold ${
              timeRemaining < 60 ? 'text-error-600' : 'text-spiritual-700'
            }`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}

        {/* Correct Answers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-success-600">
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-medium">Correct</span>
          </div>
          <span className="text-sm font-bold text-spiritual-700">
            {correctAnswers}/{currentQuestion}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;