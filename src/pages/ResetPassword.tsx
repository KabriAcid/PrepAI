import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/ui/button';
import Input from '../components/ui/input';

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = useMemo(() => searchParams.get('token') ?? '', [searchParams]);

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!token) {
            newErrors.general = 'Missing reset token. Please use the reset link sent to your email.';
        }

        if (!password) {
            newErrors.password = 'New password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!passwordConfirmation) {
            newErrors.passwordConfirmation = 'Please confirm your password';
        } else if (password !== passwordConfirmation) {
            newErrors.passwordConfirmation = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);

        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    token,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            const payload = await response.json().catch(() => ({}));
            if (!response.ok) {
                setErrors({
                    general: payload?.message ?? 'Unable to reset password. Please try again.',
                });
                return;
            }

            setSuccessMessage(
                payload?.message ??
                'Password reset successful. Redirecting to login...',
            );

            window.setTimeout(() => {
                navigate('/login');
            }, 1600);
        } catch {
            setErrors({
                general:
                    'Unable to reset password right now. Please try again later.',
            });
        } finally {
            setIsLoading(false);
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
                    <div className="mb-6 text-center">
                        <h1 className="mb-2 text-2xl font-bold text-spiritual-900">
                            Reset Password
                        </h1>
                        <p className="text-sm text-spiritual-600">
                            Enter a new secure password for your account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {errors.general && (
                            <div className="rounded-xl border border-error-200 bg-error-50 p-3 text-sm text-error-600">
                                {errors.general}
                            </div>
                        )}

                        {successMessage && (
                            <div className="rounded-xl border border-success-200 bg-success-50 p-3 text-sm text-success-700">
                                {successMessage}
                            </div>
                        )}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-spiritual-700">
                                New Password
                            </label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) {
                                        setErrors((prev) => ({ ...prev, password: '' }));
                                    }
                                }}
                                placeholder="Enter new password"
                                className="input-field"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-error-600">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-spiritual-700">
                                Confirm New Password
                            </label>
                            <Input
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) => {
                                    setPasswordConfirmation(e.target.value);
                                    if (errors.passwordConfirmation) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            passwordConfirmation: '',
                                        }));
                                    }
                                }}
                                placeholder="Re-enter new password"
                                className="input-field"
                            />
                            {errors.passwordConfirmation && (
                                <p className="mt-1 text-sm text-error-600">
                                    {errors.passwordConfirmation}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </Button>

                        <div className="text-center text-sm text-spiritual-600">
                            Back to{' '}
                            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ResetPassword;
