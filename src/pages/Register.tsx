import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Rocket, UserCheck } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountTypeSelector from '../components/registration/AccountTypeSelector';
import ProgressIndicator from '../components/registration/ProgressIndicator';
import SchoolAdminForm from '../components/registration/SchoolAdminForm';
import StudentForm from '../components/registration/StudentForm';
import SuccessModal from '../components/registration/SuccessModal';
import type {
    AccountType,
    RegistrationData,
    SchoolAdminFormData,
    StudentFormData,
} from '../types/registration';

const nigerianStates = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
];

export default function Register() {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState<AccountType>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [registrationData, setRegistrationData] = useState<RegistrationData>(
        {},
    );
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [studentFormData, setStudentFormData] = useState<StudentFormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [schoolAdminFormData, setSchoolAdminFormData] =
        useState<SchoolAdminFormData>({
            adminName: '',
            adminPhone: '',
            adminEmail: '',
            schoolState: '',
            schoolLGA: '',
            schoolName: '',
            schoolAddress: '',
            numberOfStudents: 100,
            password: '',
            password_confirmation: '',
        });

    const totalSteps = accountType === 'student' ? 3 : 4;

    const handleAccountTypeSelect = (type: AccountType) => {
        setAccountType(type);
        setCurrentStep(1);
        setErrors({});
    };

    const handleStudentFormChange = (
        field: keyof StudentFormData,
        value: string,
    ) => {
        setStudentFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleSchoolAdminFormChange = (
        field: keyof SchoolAdminFormData,
        value: string | number,
    ) => {
        setSchoolAdminFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validateCurrentStep = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (accountType === 'student') {
            if (currentStep === 1) {
                if (!studentFormData.name.trim()) {
                    newErrors.name = 'Full name is required';
                }
                if (!studentFormData.email) {
                    newErrors.email = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(studentFormData.email)) {
                    newErrors.email = 'Please enter a valid email';
                }
            } else if (currentStep === 2) {
                if (!studentFormData.password) {
                    newErrors.password = 'Password is required';
                } else if (studentFormData.password.length < 8) {
                    newErrors.password =
                        'Password must be at least 8 characters';
                }
                if (!studentFormData.password_confirmation) {
                    newErrors.password_confirmation =
                        'Please confirm your password';
                } else if (
                    studentFormData.password !==
                    studentFormData.password_confirmation
                ) {
                    newErrors.password_confirmation = 'Passwords do not match';
                }
            } else if (currentStep === 3) {
                if (!agreeToTerms) {
                    newErrors.agreeToTerms =
                        'You must agree to the terms and conditions';
                }
            }
        } else {
            // School Admin validation
            if (currentStep === 1) {
                if (!schoolAdminFormData.adminName.trim()) {
                    newErrors.adminName = 'Administrator name is required';
                }
                if (!schoolAdminFormData.adminPhone.trim()) {
                    newErrors.adminPhone = 'Phone number is required';
                }
                if (!schoolAdminFormData.adminEmail) {
                    newErrors.adminEmail = 'Email is required';
                } else if (
                    !/\S+@\S+\.\S+/.test(schoolAdminFormData.adminEmail)
                ) {
                    newErrors.adminEmail = 'Please enter a valid email';
                }
            } else if (currentStep === 2) {
                if (!schoolAdminFormData.schoolState) {
                    newErrors.schoolState = 'Please select a state';
                }
                if (!schoolAdminFormData.schoolLGA) {
                    newErrors.schoolLGA =
                        'Please select a Local Government Area';
                }
                if (!schoolAdminFormData.schoolName.trim()) {
                    newErrors.schoolName = 'School name is required';
                }
                if (!schoolAdminFormData.schoolAddress.trim()) {
                    newErrors.schoolAddress = 'School address is required';
                }
                const numStudents = schoolAdminFormData.numberOfStudents;
                if (!numStudents || numStudents < 10 || numStudents > 10000) {
                    newErrors.numberOfStudents =
                        'Number of students must be between 10 and 10,000';
                }
            } else if (currentStep === 3) {
                if (!schoolAdminFormData.password) {
                    newErrors.password = 'Password is required';
                } else if (schoolAdminFormData.password.length < 8) {
                    newErrors.password =
                        'Password must be at least 8 characters';
                }
                if (!schoolAdminFormData.password_confirmation) {
                    newErrors.password_confirmation =
                        'Please confirm your password';
                } else if (
                    schoolAdminFormData.password !==
                    schoolAdminFormData.password_confirmation
                ) {
                    newErrors.password_confirmation = 'Passwords do not match';
                }
            } else if (currentStep === 4) {
                if (!agreeToTerms) {
                    newErrors.agreeToTerms =
                        'You must agree to the terms and conditions';
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                setCurrentStep((prev) => prev + 1);
            }
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateCurrentStep()) return;

        setIsLoading(true);

        try {
            const payload =
                accountType === 'student'
                    ? {
                        account_type: 'student',
                        name: studentFormData.name,
                        email: studentFormData.email,
                        password: studentFormData.password,
                        password_confirmation:
                            studentFormData.password_confirmation,
                    }
                    : {
                        account_type: 'school_admin',
                        admin_name: schoolAdminFormData.adminName,
                        admin_phone: schoolAdminFormData.adminPhone,
                        admin_email: schoolAdminFormData.adminEmail,
                        school_state: schoolAdminFormData.schoolState,
                        school_lga: schoolAdminFormData.schoolLGA,
                        school_name: schoolAdminFormData.schoolName,
                        school_address: schoolAdminFormData.schoolAddress,
                        number_of_students:
                            schoolAdminFormData.numberOfStudents,
                        password: schoolAdminFormData.password,
                        password_confirmation:
                            schoolAdminFormData.password_confirmation,
                    };

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const responseBody = await response.json().catch(() => ({}));

            if (!response.ok) {
                setErrors({
                    general:
                        responseBody?.message ??
                        'Registration failed. Please try again.',
                });
                setIsLoading(false);
                return;
            }

            if (accountType === 'student') {
                setIsLoading(false);
                navigate('/login');
            } else {
                // For school admin, show success modal with server-provided details.
                const totalAmount = schoolAdminFormData.numberOfStudents * 1000;
                const serverData = responseBody?.data ?? {};
                setRegistrationData({
                    admin_email:
                        serverData.admin_email ?? schoolAdminFormData.adminEmail,
                    formatted_amount:
                        serverData.formatted_amount ??
                        `₦${totalAmount.toLocaleString()}.00`,
                    school_name:
                        serverData.school_name ?? schoolAdminFormData.schoolName,
                    school_code:
                        serverData.school_code ??
                        `SCH${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
                    number_of_students:
                        serverData.number_of_students ??
                        schoolAdminFormData.numberOfStudents,
                });
                setIsLoading(false);
                setShowSuccessModal(true);
            }
        } catch (error: any) {
            setErrors({
                general:
                    error.message || 'Registration failed. Please try again.',
            });
            setIsLoading(false);
        }
    };

    const handleBackToAccountType = () => {
        setAccountType(null);
        setCurrentStep(1);
        setAgreeToTerms(false);
        setErrors({});
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-3 sm:p-4">
            <div className="w-full max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-container"
                >
                    {/* Header */}
                    <div className="mb-6 text-center sm:mb-8">
                        <h1 className="mb-2 text-2xl font-bold text-spiritual-900 sm:text-3xl">
                            Create Your Account
                        </h1>
                        <p className="text-sm text-spiritual-600 sm:text-base">
                            Join thousands of students preparing for success! 🎯
                        </p>
                    </div>

                    {/* Account Type Selection */}
                    {!accountType && (
                        <AccountTypeSelector
                            onSelect={handleAccountTypeSelect}
                        />
                    )}

                    {/* Registration Form */}
                    {accountType && (
                        <>
                            <ProgressIndicator
                                currentStep={currentStep}
                                totalSteps={totalSteps}
                                accountType={accountType}
                            />

                            <form
                                onSubmit={
                                    currentStep === totalSteps
                                        ? handleSubmit
                                        : handleNextStep
                                }
                                className="space-y-4 sm:space-y-6"
                            >
                                {/* Error Alert */}
                                {errors.general && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="error-alert"
                                    >
                                        {errors.general}
                                    </motion.div>
                                )}

                                {/* Form Content */}
                                {accountType === 'student' ? (
                                    <StudentForm
                                        currentStep={currentStep}
                                        formData={studentFormData}
                                        onChange={handleStudentFormChange}
                                        errors={errors}
                                    />
                                ) : (
                                    <SchoolAdminForm
                                        currentStep={currentStep}
                                        formData={schoolAdminFormData}
                                        onChange={handleSchoolAdminFormChange}
                                        errors={errors}
                                        states={nigerianStates}
                                    />
                                )}

                                {/* Terms & Conditions Checkbox */}
                                {currentStep === totalSteps && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-2"
                                    >
                                        <label className="flex cursor-pointer items-start space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={agreeToTerms}
                                                onChange={(e) =>
                                                    setAgreeToTerms(
                                                        e.target.checked,
                                                    )
                                                }
                                                className="mt-0.5 h-5 w-5 rounded border-spiritual-300 text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="text-xs leading-relaxed text-spiritual-600 sm:text-sm">
                                                I agree to the{' '}
                                                <a
                                                    href="/terms"
                                                    className="text-primary-600 underline hover:text-primary-700"
                                                >
                                                    Terms & Conditions
                                                </a>{' '}
                                                and{' '}
                                                <a
                                                    href="/privacy"
                                                    className="text-primary-600 underline hover:text-primary-700"
                                                >
                                                    Privacy Policy
                                                </a>
                                            </span>
                                        </label>
                                        {errors.agreeToTerms && (
                                            <p className="ml-8 text-sm text-error-600">
                                                {errors.agreeToTerms}
                                            </p>
                                        )}
                                    </motion.div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex flex-col-reverse gap-3 border-t border-spiritual-200 pt-4 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
                                    {currentStep > 1 ? (
                                        <motion.button
                                            type="button"
                                            onClick={handlePreviousStep}
                                            whileTap={{ scale: 0.95 }}
                                            className="btn-back w-full justify-center sm:w-auto"
                                        >
                                            <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                            Back
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            type="button"
                                            onClick={handleBackToAccountType}
                                            whileTap={{ scale: 0.95 }}
                                            className="btn-back w-full justify-center sm:w-auto"
                                        >
                                            <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                            Change Account Type
                                        </motion.button>
                                    )}

                                    {currentStep === totalSteps ? (
                                        <motion.button
                                            type="submit"
                                            disabled={
                                                isLoading || !agreeToTerms
                                            }
                                            whileHover={
                                                !isLoading && agreeToTerms
                                                    ? { scale: 1.05 }
                                                    : {}
                                            }
                                            whileTap={
                                                !isLoading && agreeToTerms
                                                    ? { scale: 0.95 }
                                                    : {}
                                            }
                                            className={`inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-bold shadow-medium transition-all duration-300 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base ${agreeToTerms && !isLoading
                                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-strong'
                                                : 'cursor-not-allowed bg-spiritual-300 text-spiritual-500'
                                                }`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg
                                                        className="-ml-1 mr-2 h-4 w-4 animate-spin"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : accountType === 'student' ? (
                                                <>
                                                    <UserCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                    Create Account
                                                </>
                                            ) : (
                                                <>
                                                    <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                                    Complete Registration
                                                </>
                                            )}
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            type="submit"
                                            disabled={isLoading}
                                            whileHover={
                                                !isLoading
                                                    ? { scale: 1.05 }
                                                    : {}
                                            }
                                            whileTap={
                                                !isLoading
                                                    ? { scale: 0.95 }
                                                    : {}
                                            }
                                            className="btn-continue w-full justify-center sm:w-auto"
                                        >
                                            Continue
                                            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                        </motion.button>
                                    )}
                                </div>
                            </form>
                        </>
                    )}

                    {/* Sign In Link */}
                    <div className="mt-6 border-t border-spiritual-200 pt-4 text-center sm:mt-8 sm:pt-6">
                        <p className="text-xs text-spiritual-600 sm:text-sm">
                            Already have an account?
                            <Link
                                to="/login"
                                className="ml-1 font-semibold text-primary-600 hover:text-primary-700"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={handleSuccessModalClose}
                registrationData={registrationData}
            />
        </div>
    );
}
