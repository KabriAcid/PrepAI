import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { AccountType } from '../../types/registration';

interface ProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
    accountType: AccountType;
}

const studentStepLabels = ['Account', 'Security', 'Confirm'];
const adminStepLabels = [
    'Admin Info',
    'School Details',
    'Address & Capacity',
    'Security',
    'Confirm',
];

export default function ProgressIndicator({
    currentStep,
    totalSteps,
    accountType,
}: ProgressIndicatorProps) {
    const stepLabels =
        accountType === 'student' ? studentStepLabels : adminStepLabels;

    return (
        <div className="mb-6 sm:mb-8">
            {/* Desktop: Full Step Indicators */}
            <div className="hidden items-center justify-between lg:flex">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
                    (step) => (
                        <div
                            key={step}
                            className={`flex items-center ${step < totalSteps ? 'flex-1' : ''}`}
                        >
                            <div className="flex flex-col items-center">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: currentStep === step ? 1.1 : 1,
                                    }}
                                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all duration-300 ${currentStep > step ? 'bg-success-600 text-white' : currentStep === step ? 'bg-primary-600 text-white' : 'bg-spiritual-200 text-spiritual-600'}`}
                                >
                                    {currentStep > step ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        step
                                    )}
                                </motion.div>
                                <span className="mt-2 text-xs font-medium text-spiritual-600">
                                    {stepLabels[step - 1]}
                                </span>
                            </div>
                            {step < totalSteps && (
                                <div
                                    className={`mx-4 h-1 flex-1 rounded border-t-2 border-dotted transition-all duration-300 ${currentStep > step ? 'border-success-600' : 'border-spiritual-200'}`}
                                />
                            )}
                        </div>
                    ),
                )}
            </div>

            {/* Mobile: Single Step Display */}
            <div className="lg:hidden">
                <div className="mb-3 flex flex-col items-center gap-2">
                    <span className="text-lg font-bold text-primary-600">
                        Step {currentStep} of {totalSteps}
                    </span>
                    <span className="text-sm font-medium text-spiritual-600">
                        {stepLabels[currentStep - 1]}
                    </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-spiritual-200">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{
                            width: `${(currentStep / totalSteps) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                    />
                </div>
            </div>
        </div>
    );
}
