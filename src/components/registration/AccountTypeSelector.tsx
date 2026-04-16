import { motion } from 'framer-motion';
import { School, User } from 'lucide-react';
import type { AccountType } from '../../types/registration';

interface AccountTypeSelectorProps {
    onSelect: (type: AccountType) => void;
}

export default function AccountTypeSelector({
    onSelect,
}: AccountTypeSelectorProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 space-y-4"
        >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <motion.button
                    type="button"
                    onClick={() => onSelect('student')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group rounded-xl border-2 border-spiritual-200 p-4 transition-all duration-300 hover:border-primary-300 hover:bg-primary-50 focus:outline-none sm:rounded-2xl sm:p-6"
                >
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 transition-colors group-hover:bg-primary-200">
                            <User className="h-6 w-6 text-primary-600" />
                        </div>
                        <span className="rounded-full bg-success-100 px-3 py-1 text-xs font-semibold text-success-700">
                            FREE
                        </span>
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-spiritual-900">
                        Student
                    </h3>
                    <p className="text-sm text-spiritual-600">
                        Start your free trial with basic features. Perfect for
                        exam prep.
                    </p>
                </motion.button>

                <motion.button
                    type="button"
                    onClick={() => onSelect('school_admin')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group rounded-xl border-2 border-spiritual-200 p-4 transition-all duration-300 hover:border-secondary-300 hover:bg-secondary-50 focus:outline-none sm:rounded-2xl sm:p-6"
                >
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100 transition-colors group-hover:bg-secondary-200">
                            <School className="h-6 w-6 text-secondary-600" />
                        </div>
                        <span className="rounded-full bg-warning-100 px-3 py-1 text-xs font-semibold text-warning-700">
                            PREMIUM
                        </span>
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-spiritual-900">
                        School Admin
                    </h3>
                    <p className="text-sm text-spiritual-600">
                        Manage students & assessments. Full platform access.
                    </p>
                </motion.button>
            </div>
        </motion.div>
    );
}
