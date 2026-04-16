import { AnimatePresence, motion } from 'framer-motion';
import { Home } from 'lucide-react';
import type { RegistrationData } from '../../types/registration';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    registrationData: RegistrationData;
}

export default function SuccessModal({
    isOpen,
    onClose,
    registrationData,
}: SuccessModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-strong sm:rounded-3xl sm:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Success Animation */}
                        <div className="mb-6 text-center">
                            <div className="mb-4 flex justify-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        delay: 0.2,
                                        type: 'spring',
                                        stiffness: 200,
                                    }}
                                    className="flex h-24 w-24 items-center justify-center rounded-full bg-success-100"
                                >
                                    <motion.svg
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{
                                            delay: 0.4,
                                            duration: 0.5,
                                        }}
                                        className="h-16 w-16 text-success-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <motion.path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </motion.svg>
                                </motion.div>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold text-spiritual-900 sm:text-3xl">
                                Registration Successful! 🎉
                            </h2>
                            <p className="text-sm text-spiritual-600 sm:text-base">
                                Your school account has been created
                            </p>
                        </div>

                        {/* Registration Details */}
                        <div className="mb-6 rounded-xl border border-primary-200 bg-primary-50 p-4 sm:p-6">
                            <h3 className="mb-4 text-base font-bold text-spiritual-900 sm:text-lg">
                                📧 What Happens Next?
                            </h3>
                            <div className="space-y-3 text-sm text-spiritual-700 sm:text-base">
                                <div className="flex items-start">
                                    <span className="mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                                        1
                                    </span>
                                    <p>
                                        Check your email{' '}
                                        <strong>
                                            ({registrationData.admin_email})
                                        </strong>{' '}
                                        for payment instructions
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <span className="mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                                        2
                                    </span>
                                    <p>
                                        Make payment of{' '}
                                        <strong className="text-warning-700">
                                            {registrationData.formatted_amount}
                                        </strong>{' '}
                                        to the provided account
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <span className="mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                                        3
                                    </span>
                                    <p>
                                        Your account will be activated within{' '}
                                        <strong>24 hours</strong> of payment
                                        confirmation
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <span className="mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                                        4
                                    </span>
                                    <p>
                                        You'll receive an activation email with
                                        your dashboard access link
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Account Details */}
                        <div className="mb-6 rounded-xl border border-secondary-200 bg-secondary-50 p-4 sm:p-6">
                            <h4 className="mb-3 text-sm font-bold text-spiritual-900 sm:text-base">
                                Your School Details:
                            </h4>
                            <div className="space-y-2 text-xs sm:text-sm">
                                <div className="flex justify-between">
                                    <span className="text-spiritual-600">
                                        School Name:
                                    </span>
                                    <span className="font-medium">
                                        {registrationData.school_name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-spiritual-600">
                                        School Code:
                                    </span>
                                    <span className="font-mono font-bold text-primary-600">
                                        {registrationData.school_code}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-spiritual-600">
                                        Student Capacity:
                                    </span>
                                    <span className="font-medium">
                                        {registrationData.number_of_students?.toLocaleString()}{' '}
                                        students
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={onClose}
                            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-bold text-white shadow-medium transition-all duration-300 hover:scale-105 hover:shadow-strong active:scale-95 sm:py-4 sm:text-base"
                        >
                            <Home className="mr-2 h-5 w-5" />
                            Back to Home
                        </button>

                        <p className="mt-4 text-center text-xs text-spiritual-500 sm:text-sm">
                            Need help? Contact us at{' '}
                            <a
                                href="mailto:support@skool.ng"
                                className="text-primary-600 hover:underline"
                            >
                                support@skool.ng
                            </a>
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
