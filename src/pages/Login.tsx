import { motion } from 'framer-motion';
import { School, UserRound } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/button';
import Input from '../components/ui/input';

type AccountType = 'student' | 'school_admin';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [accountType, setAccountType] = useState<AccountType>('student');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] =
        useState(false);
    const [isForgotLoading, setIsForgotLoading] = useState(false);
    const [forgotStatusMessage, setForgotStatusMessage] = useState('');

    const redirectState =
        location.state as
        | {
            redirectTo?: string;
            examId?: number;
        }
        | undefined;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateForgotPassword = () => {
        const newErrors: Record<string, string> = {};

        if (!forgotPasswordData.email) {
            newErrors.forgotEmail = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(forgotPasswordData.email)) {
            newErrors.forgotEmail = 'Please enter a valid email';
        }

        setErrors((prev) => ({ ...prev, ...newErrors }));
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Frontend-only auth for now; backend wiring can be added later.
            await new Promise((resolve) => setTimeout(resolve, 450));

            if (accountType === 'student' && redirectState?.redirectTo) {
                navigate(redirectState.redirectTo, {
                    state:
                        redirectState.examId !== undefined
                            ? { examId: redirectState.examId }
                            : undefined,
                });
                return;
            }

            navigate(accountType === 'school_admin' ? '/admin' : '/student/dashboard');
        } catch {
            setErrors({
                general:
                    'Network error. Please check your connection and retry.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenForgotPassword = () => {
        setForgotStatusMessage('');
        setErrors((prev) => ({ ...prev, forgotEmail: '' }));
        setForgotPasswordData({ email: formData.email });
        setShowForgotPasswordModal(true);
    };

    const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForgotPassword()) return;

        setIsForgotLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 450));
            setForgotStatusMessage(
                'Reset instructions queued successfully. Backend email delivery will be connected later.',
            );
        } catch {
            setErrors((prev) => ({
                ...prev,
                forgotEmail:
                    'Unable to send reset instructions right now. Please try again.',
            }));
        } finally {
            setIsForgotLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-white/20 bg-white/90 p-8 shadow-strong backdrop-blur-sm"
                >
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-2xl font-bold text-spiritual-900">
                            Sign In
                        </h1>
                        <p className="text-spiritual-600">
                            Welcome back, select your portal to continue
                        </p>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-spiritual-100 p-1">
                        <button
                            type="button"
                            onClick={() => setAccountType('student')}
                            className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${accountType === 'student'
                                ? 'bg-white text-primary-700 shadow-soft'
                                : 'text-spiritual-600 hover:text-spiritual-800'
                                }`}
                        >
                            <UserRound className="h-4 w-4" />
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => setAccountType('school_admin')}
                            className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${accountType === 'school_admin'
                                ? 'bg-white text-primary-700 shadow-soft'
                                : 'text-spiritual-600 hover:text-spiritual-800'
                                }`}
                        >
                            <School className="h-4 w-4" />
                            School Admin
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errors.general && (
                            <div className="rounded-xl border border-error-200 bg-error-50 p-3 text-sm text-error-600">
                                {errors.general}
                            </div>
                        )}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-spiritual-700">
                                Email ID
                            </label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter Email ID"
                                className="input-field"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-error-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-spiritual-700">
                                Password
                            </label>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter Password"
                                className="input-field"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-error-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 rounded border-spiritual-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="text-sm text-spiritual-600">
                                    Remember Me
                                </span>
                            </label>
                            <Link
                                to="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOpenForgotPassword();
                                }}
                                className="text-sm text-primary-600 hover:text-primary-700"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center space-x-2 rounded-lg btn-primary px-4 py-3 font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading && (
                                <svg
                                    className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
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
                            )}
                            <span>
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </span>
                        </button>

                        <div className="text-center">
                            <span className="text-spiritual-600">
                                Don't have an account?{' '}
                            </span>
                            <Link
                                to="/register"
                                className="font-medium text-primary-600 hover:text-primary-700"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </div>

            <Modal
                isOpen={showForgotPasswordModal}
                onClose={() => setShowForgotPasswordModal(false)}
                title="Reset Password"
                size="md"
            >
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                    <p className="text-sm text-spiritual-600">
                        Enter your login email and we will send password reset
                        instructions.
                    </p>

                    <Input
                        type="email"
                        value={forgotPasswordData.email}
                        onChange={(e) => {
                            setForgotPasswordData({ email: e.target.value });
                            if (errors.forgotEmail) {
                                setErrors((prev) => ({
                                    ...prev,
                                    forgotEmail: '',
                                }));
                            }
                        }}
                        placeholder="you@example.com"
                    />
                    {errors.forgotEmail && (
                        <p className="text-sm text-error-600">
                            {errors.forgotEmail}
                        </p>
                    )}

                    {forgotStatusMessage && (
                        <div className="rounded-xl border border-success-200 bg-success-50 p-3 text-sm text-success-700">
                            {forgotStatusMessage}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            className="flex-1"
                            onClick={() => setShowForgotPasswordModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                            disabled={isForgotLoading}
                        >
                            {isForgotLoading
                                ? 'Sending...'
                                : 'Send Reset Link'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Login;
