import { motion } from 'framer-motion';
import {
    BookOpenCheck,
    Building2,
    ClipboardCheck,
    UserRound,
} from 'lucide-react';
import type { AccountType } from '../../types/registration';

interface ProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
    accountType: AccountType;
}

const studentSteps = [
    {
        title: 'Personal Info',
        subtitle: 'Please provide your personal details',
        icon: UserRound,
    },
    {
        title: 'Review & Confirm',
        subtitle: 'Confirm your details before submission',
        icon: ClipboardCheck,
    },
];

const adminSteps = [
    {
        title: 'Admin Info',
        subtitle: 'Tell us about the school administrator',
        icon: UserRound,
    },
    {
        title: 'School Details',
        subtitle: 'Enter school profile, location and capacity',
        icon: Building2,
    },
    {
        title: 'Review & Confirm',
        subtitle: 'Check all details and submit your registration',
        icon: BookOpenCheck,
    },
];

export default function ProgressIndicator({
    currentStep,
    totalSteps,
    accountType,
}: ProgressIndicatorProps) {
    const steps = accountType === 'student' ? studentSteps : adminSteps;
    const activeStep = steps[currentStep - 1];
    const ActiveIcon = activeStep.icon;

    return (
        <div className="mb-6 sm:mb-8">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-primary-100 bg-primary-50/70 p-4 sm:p-5 lg:p-6"
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-soft sm:h-12 sm:w-12 sm:rounded-2xl">
                            <ActiveIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="truncate text-lg font-bold text-spiritual-900 sm:text-2xl lg:text-3xl">
                                {activeStep.title}
                            </h3>
                            <p className="mt-1 text-xs text-primary-700 sm:text-sm lg:text-base">
                                {activeStep.subtitle}
                            </p>
                        </div>
                    </div>

                    <span className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700 sm:px-3 sm:text-sm">
                        {currentStep}/{totalSteps}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
