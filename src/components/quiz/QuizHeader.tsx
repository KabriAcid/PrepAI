import { motion } from 'framer-motion';

type QuizHeaderProps = {
    timeRemaining: number;
    timerProgress: number;
    formattedTime: string;
};

export default function QuizHeader({
    timeRemaining,
    timerProgress,
    formattedTime,
}: QuizHeaderProps) {
    return (
        <div className="sticky top-16 z-20 mb-4 rounded-2xl border border-primary-200 bg-white/95 p-4 shadow-soft backdrop-blur-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-spiritual-900">
                        JAMB Mock CBT
                    </h1>
                    <p className="text-sm sm:text-base text-spiritual-600">
                        Answer all questions before submitting your exam.
                    </p>
                </div>

                <div className="text-left sm:text-right">
                    <p className="text-xs uppercase tracking-wider font-semibold text-primary-700">
                        Time Remaining
                    </p>
                    <p
                        className={`text-3xl sm:text-5xl font-extrabold leading-none ${timeRemaining <= 60 ? 'text-error-600' : 'text-primary-600'
                            }`}
                    >
                        {formattedTime}
                    </p>
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
    );
}
