import { AnimatePresence, motion } from 'framer-motion';
import { Lock, LockKeyhole, Mail, User } from 'lucide-react';
import type { StudentFormData } from '../../types/registration';

interface StudentFormProps {
    currentStep: number;
    formData: StudentFormData;
    onChange: (field: keyof StudentFormData, value: string) => void;
    errors?: Partial<Record<keyof StudentFormData, string>>;
}

const fadeInScale = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3 },
};

export default function StudentForm({
    currentStep,
    formData,
    onChange,
    errors = {},
}: StudentFormProps) {
    return (
        <AnimatePresence mode="wait">
            {currentStep === 1 && (
                <motion.div
                    key="step1"
                    {...fadeInScale}
                    className="space-y-4 sm:space-y-5"
                >
                    <div>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-5 w-5 text-spiritual-400" />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    onChange('name', e.target.value)
                                }
                                placeholder="Full Name"
                                className="w-full rounded-xl border border-spiritual-300 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-primary-500 sm:text-base"
                                required
                            />
                        </div>
                        {errors.name && (
                            <span className="mt-1 block text-sm text-error-600">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-spiritual-400" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    onChange('email', e.target.value)
                                }
                                placeholder="Email Address"
                                className="w-full rounded-xl border border-spiritual-300 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-primary-500 sm:text-base"
                                required
                            />
                        </div>
                        {errors.email && (
                            <span className="mt-1 block text-sm text-error-600">
                                {errors.email}
                            </span>
                        )}
                    </div>
                </motion.div>
            )}

            {currentStep === 2 && (
                <motion.div
                    key="step2"
                    {...fadeInScale}
                    className="space-y-4 sm:space-y-5"
                >
                    <div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-spiritual-400" />
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    onChange('password', e.target.value)
                                }
                                placeholder="Password"
                                className="w-full rounded-xl border border-spiritual-300 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-primary-500 sm:text-base"
                                required
                            />
                        </div>
                        <p className="mt-1 text-xs text-spiritual-500">
                            Minimum 8 characters
                        </p>
                        {errors.password && (
                            <span className="mt-1 block text-sm text-error-600">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="relative">
                            <LockKeyhole className="absolute left-3 top-3.5 h-5 w-5 text-spiritual-400" />
                            <input
                                type="password"
                                value={formData.password_confirmation}
                                onChange={(e) =>
                                    onChange(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                placeholder="Confirm Password"
                                className="w-full rounded-xl border border-spiritual-300 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-primary-500 sm:text-base"
                                required
                            />
                        </div>
                        {errors.password_confirmation && (
                            <span className="mt-1 block text-sm text-error-600">
                                {errors.password_confirmation}
                            </span>
                        )}
                    </div>
                </motion.div>
            )}

            {currentStep === 3 && (
                <motion.div
                    key="step3"
                    {...fadeInScale}
                    className="space-y-4 sm:space-y-6"
                >
                    <div className="rounded-xl border border-primary-200 bg-primary-50 p-4 sm:p-6">
                        <h3 className="mb-3 text-base font-bold text-spiritual-900 sm:mb-4 sm:text-lg">
                            📝 Review Your Information
                        </h3>
                        <div className="space-y-2 text-sm sm:text-base">
                            <p>
                                <span className="font-medium">Name:</span>{' '}
                                {formData.name}
                            </p>
                            <p>
                                <span className="font-medium">Email:</span>{' '}
                                {formData.email}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
