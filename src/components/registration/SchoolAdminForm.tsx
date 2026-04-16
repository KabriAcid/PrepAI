import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    Building2,
    Info,
    Mail,
    Map,
    MapPin,
    MapPinned,
    Phone,
    User,
    Users,
} from 'lucide-react';
import type { SchoolAdminFormData } from '../../types/registration';
import { getLGAsForState } from '../../utils/lga-data';

interface SchoolAdminFormProps {
    currentStep: number;
    formData: SchoolAdminFormData;
    onChange: (
        field: keyof SchoolAdminFormData,
        value: string | number,
    ) => void;
    errors?: Partial<Record<keyof SchoolAdminFormData, string>>;
    states: string[];
}

const fadeInScale = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3 },
};

export default function SchoolAdminForm({
    currentStep,
    formData,
    onChange,
    errors = {},
    states,
}: SchoolAdminFormProps) {
    const totalAmount = formData.numberOfStudents * 1000;

    return (
        <AnimatePresence mode="wait">
            {/* Step 1: Admin Information */}
            {currentStep === 1 && (
                <motion.div
                    key="step1"
                    {...fadeInScale}
                    className="space-y-4 sm:space-y-5"
                >
                    <div className="mb-4 rounded-xl border border-secondary-200 bg-secondary-50 p-3 sm:p-4">
                        <p className="text-xs text-spiritual-700 sm:text-sm">
                            <Info className="mr-1 inline h-4 w-4" />
                            This will be your administrator account to manage
                            students and exams.
                        </p>
                    </div>

                    {/* 2x2 Grid Layout */}
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                        {/* Admin Name */}
                        <div>
                            <div className="relative">
                                <User className="input-icon" />
                                <input
                                    type="text"
                                    value={formData.adminName}
                                    onChange={(e) =>
                                        onChange('adminName', e.target.value)
                                    }
                                    placeholder="Full Name"
                                    className="input-field-icon"
                                    required
                                />
                            </div>
                            {errors.adminName && (
                                <span className="mt-1 block text-sm text-error-600">
                                    {errors.adminName}
                                </span>
                            )}
                        </div>

                        {/* Admin Phone */}
                        <div>
                            <div className="relative">
                                <Phone className="input-icon" />
                                <input
                                    type="tel"
                                    value={formData.adminPhone}
                                    onChange={(e) =>
                                        onChange('adminPhone', e.target.value)
                                    }
                                    placeholder="Phone Number"
                                    className="input-field-icon"
                                    required
                                />
                            </div>
                            {errors.adminPhone && (
                                <span className="mt-1 block text-sm text-error-600">
                                    {errors.adminPhone}
                                </span>
                            )}
                        </div>

                        {/* Admin Email - spans full width */}
                        <div className="sm:col-span-2">
                            <div className="relative">
                                <Mail className="input-icon" />
                                <input
                                    type="email"
                                    value={formData.adminEmail}
                                    onChange={(e) =>
                                        onChange('adminEmail', e.target.value)
                                    }
                                    placeholder="Email Address"
                                    className="input-field-icon"
                                    required
                                />
                            </div>
                            {errors.adminEmail && (
                                <span className="mt-1 block text-sm text-error-600">
                                    {errors.adminEmail}
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Step 2: School Details */}
            {currentStep === 2 && (
                <motion.div
                    key="step2"
                    {...fadeInScale}
                    className="space-y-4 sm:space-y-5"
                >
                    {/* 2x2 Grid Layout */}
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                        {/* State */}
                        <div>
                            <div className="relative">
                                <MapPin className="input-icon" />
                                <select
                                    value={formData.schoolState}
                                    onChange={(e) =>
                                        onChange('schoolState', e.target.value)
                                    }
                                    className="select-field"
                                    required
                                >
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.schoolState && (
                                <span className="mt-1 block text-sm text-error-600">
                                    {errors.schoolState}
                                </span>
                            )}
                        </div>

                        {/* LGA */}
                        <div>
                            <div className="relative">
                                <Map className="input-icon" />
                                <select
                                    value={formData.schoolLGA}
                                    onChange={(e) =>
                                        onChange('schoolLGA', e.target.value)
                                    }
                                    disabled={!formData.schoolState}
                                    className="select-field"
                                    required
                                >
                                    <option value="">...Select LGA...</option>
                                    {formData.schoolState &&
                                        getLGAsForState(
                                            formData.schoolState,
                                        ).map((lga) => (
                                            <option key={lga} value={lga}>
                                                {lga}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            {errors.schoolLGA && (
                                <span className="mt-1 block text-sm text-error-600">
                                    {errors.schoolLGA}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* School Name - Full Width */}
                    <div>
                        <div className="relative">
                            <Building2 className="input-icon" />
                            <input
                                type="text"
                                value={formData.schoolName}
                                onChange={(e) =>
                                    onChange('schoolName', e.target.value)
                                }
                                placeholder="School Name"
                                className="input-field-icon"
                                required
                            />
                        </div>
                        {errors.schoolName && (
                            <span className="mt-1 block text-sm text-error-600">
                                {errors.schoolName}
                            </span>
                        )}
                    </div>

                    {/* Address - Full Width */}
                    <div>
                        <div className="relative">
                            <MapPinned className="input-icon" />
                            <textarea
                                value={formData.schoolAddress}
                                onChange={(e) =>
                                    onChange('schoolAddress', e.target.value)
                                }
                                rows={3}
                                placeholder="Full School Address"
                                className="textarea-field"
                                required
                            />
                        </div>
                        {errors.schoolAddress && (
                            <span className="mt-1 block text-sm text-error-600">
                                {errors.schoolAddress}
                            </span>
                        )}
                    </div>

                    {/* Number of Students */}
                    <div>
                        <div className="relative">
                            <Users className="input-icon" />
                            <input
                                type="number"
                                value={formData.numberOfStudents || ''}
                                onChange={(e) =>
                                    onChange(
                                        'numberOfStudents',
                                        parseInt(e.target.value) || 0,
                                    )
                                }
                                min={10}
                                max={10000}
                                placeholder="Number of Students"
                                className="input-field-icon"
                                required
                            />
                        </div>
                        <p className="mt-2 text-xs text-spiritual-600 sm:text-sm">
                            💰 Cost:{' '}
                            <span className="font-bold text-primary-600">
                                ₦{totalAmount.toLocaleString()}.00
                            </span>
                            <span className="text-spiritual-500">
                                {' '}
                                (₦1,000 per student)
                            </span>
                        </p>
                        {errors.numberOfStudents && (
                            <span className="mt-1 block text-sm text-error-600">
                                {errors.numberOfStudents}
                            </span>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
                <motion.div
                    key="step3"
                    {...fadeInScale}
                    className="space-y-4 sm:space-y-6"
                >
                    <div className="rounded-xl border border-primary-200 bg-primary-50 p-4 sm:p-6">
                        <h3 className="mb-3 text-base font-bold text-spiritual-900 sm:mb-4 sm:text-lg">
                            📋 Registration Summary
                        </h3>
                        <div className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
                            <div className="flex justify-between">
                                <span className="font-medium">
                                    Administrator:
                                </span>
                                <span className="text-right">
                                    {formData.adminName}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">
                                    Admin Phone:
                                </span>
                                <span className="text-right">
                                    {formData.adminPhone}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">
                                    Admin Email:
                                </span>
                                <span className="text-right">
                                    {formData.adminEmail}
                                </span>
                            </div>
                            <div className="border-t border-primary-300 pt-2 sm:pt-3">
                                <div className="mb-2 flex justify-between">
                                    <span className="font-medium">
                                        School Name:
                                    </span>
                                    <span className="text-right">
                                        {formData.schoolName}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Location:
                                    </span>
                                    <span className="text-right">
                                        {formData.schoolLGA},{' '}
                                        {formData.schoolState}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Address:</span>
                                <span className="text-right">
                                    {formData.schoolAddress}
                                </span>
                            </div>
                            <div className="flex items-center justify-between pt-2 sm:pt-3">
                                <span className="font-bold">Students:</span>
                                <span className="font-bold text-primary-600">
                                    {formData.numberOfStudents.toLocaleString()}
                                </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between rounded-lg border border-primary-200 bg-primary-100/70 p-2 sm:mt-3 sm:p-3">
                                <span className="font-bold">Total Amount:</span>
                                <span className="text-lg font-bold text-primary-700 sm:text-xl">
                                    ₦{totalAmount.toLocaleString()}.00
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-3 sm:p-4">
                        <p className="text-xs leading-relaxed text-spiritual-700 sm:text-sm">
                            <AlertCircle className="mr-1 inline h-4 w-4 text-secondary-600" />
                            After registration, you'll receive payment
                            instructions via email. Your account will be
                            activated within 24 hours of payment confirmation.
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
