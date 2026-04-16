import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const app = express();
app.use(cors());
app.use(express.json());

const APP_NAME = process.env.APP_NAME || 'PrepAI';
const APP_URL = process.env.APP_URL || 'http://localhost:5173';
const API_PORT = Number(process.env.API_PORT || 8000);

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

const getMailFrom = () => {
    const fromAddress = process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME;
    return `${APP_NAME} <${fromAddress}>`;
};

const templatePath = path.join(
    ROOT_DIR,
    'src',
    'templates',
    'emails',
    'school-admin-payment-instructions.html',
);

const resetTemplatePath = path.join(
    ROOT_DIR,
    'src',
    'templates',
    'emails',
    'password-reset-instructions.html',
);

const RESET_TOKEN_TTL_MS = 1000 * 60 * 30;

const userPasswords = new Map();

const resetTokens = new Map();

function renderTemplate(template, variables) {
    return Object.entries(variables).reduce(
        (acc, [key, value]) => acc.replaceAll(`{{${key}}}`, String(value)),
        template,
    );
}

function isEmail(value) {
    return typeof value === 'string' && /\S+@\S+\.\S+/.test(value);
}

app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'registration-mail-api' });
});

app.post('/api/login', (req, res) => {
    const payload = req.body || {};
    const accountType = payload.account_type;
    const email = String(payload.email || '').toLowerCase();
    const password = String(payload.password || '');

    if (!accountType || !['student', 'school_admin'].includes(accountType)) {
        return res.status(400).json({
            message: 'account_type must be either student or school_admin.',
        });
    }

    if (!isEmail(email) || !password) {
        return res.status(400).json({
            message: 'Valid email and password are required.',
        });
    }

    return res.status(200).json({
        message: 'Login successful.',
        data: {
            account_type: accountType,
            user: {
                name: email.split('@')[0] || 'User',
                email,
            },
            redirect_path:
                accountType === 'school_admin'
                    ? '/admin'
                    : '/student/dashboard',
        },
    });
});

app.post('/api/forgot-password', async (req, res) => {
    const payload = req.body || {};
    const accountType = payload.account_type;
    const email = String(payload.email || '').toLowerCase();

    if (!accountType || !isEmail(email)) {
        return res.status(400).json({
            message: 'account_type and valid email are required.',
        });
    }

    try {
        const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
        const expiresAt = Date.now() + RESET_TOKEN_TTL_MS;
        resetTokens.set(token, {
            email,
            accountType,
            expiresAt,
        });

        const template = await fs.readFile(resetTemplatePath, 'utf8');
        const resetBase = process.env.RESET_PASSWORD_LINK_BASE || `${APP_URL}/reset-password`;
        const resetLink = `${resetBase}?token=${encodeURIComponent(token)}&role=${encodeURIComponent(accountType)}`;

        const html = renderTemplate(template, {
            base_url: APP_URL,
            recipient_name: email.split('@')[0] || 'User',
            account_type_label: accountType === 'school_admin' ? 'School Admin' : 'Student',
            reset_link: resetLink,
            expires_in: '30 minutes',
            support_link: process.env.SUPPORT_LINK || `${APP_URL}/support`,
            year: new Date().getFullYear(),
        });

        await transporter.sendMail({
            from: getMailFrom(),
            to: email,
            subject: `${APP_NAME} password reset instructions`,
            html,
        });

        return res.status(200).json({
            message:
                'If the account exists, password reset instructions have been sent.',
        });
    } catch (error) {
        console.error('Failed to send password reset email:', error);
        return res.status(500).json({
            message:
                'Unable to send password reset instructions right now. Please try again later.',
        });
    }
});

app.post('/api/reset-password', (req, res) => {
    const payload = req.body || {};
    const token = String(payload.token || '');
    const password = String(payload.password || '');
    const passwordConfirmation = String(payload.password_confirmation || '');

    if (!token || !password || !passwordConfirmation) {
        return res.status(400).json({
            message: 'token, password and password_confirmation are required.',
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters.',
        });
    }

    if (password !== passwordConfirmation) {
        return res.status(400).json({
            message: 'Password confirmation does not match.',
        });
    }

    const tokenData = resetTokens.get(token);
    if (!tokenData) {
        return res.status(400).json({ message: 'Invalid or expired reset token.' });
    }

    if (Date.now() > tokenData.expiresAt) {
        resetTokens.delete(token);
        return res.status(400).json({ message: 'Invalid or expired reset token.' });
    }

    userPasswords.set(tokenData.email, password);
    resetTokens.delete(token);

    return res.status(200).json({
        message: 'Password reset successful. You can now sign in with your new password.',
    });
});

app.post('/api/register', async (req, res) => {
    const payload = req.body || {};

    if (!payload.account_type) {
        return res.status(400).json({ message: 'account_type is required.' });
    }

    if (payload.account_type === 'student') {
        if (!payload.name || !isEmail(payload.email)) {
            return res.status(400).json({
                message: 'Student registration requires valid name and email.',
            });
        }

        return res.status(201).json({
            message: 'Student registration successful.',
            data: {
                account_type: 'student',
            },
        });
    }

    if (payload.account_type !== 'school_admin') {
        return res.status(400).json({ message: 'Invalid account_type.' });
    }

    const {
        admin_name,
        admin_email,
        school_name,
        number_of_students,
    } = payload;

    if (!admin_name || !isEmail(admin_email) || !school_name) {
        return res.status(400).json({
            message: 'School admin registration requires admin_name, admin_email and school_name.',
        });
    }

    const studentCapacity = Number(number_of_students || 0);
    if (!Number.isFinite(studentCapacity) || studentCapacity < 10) {
        return res.status(400).json({
            message: 'number_of_students must be at least 10.',
        });
    }

    const totalAmount = studentCapacity * 1000;
    const schoolCode = `SCH${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    try {
        const template = await fs.readFile(templatePath, 'utf8');

        const html = renderTemplate(template, {
            base_url: APP_URL,
            admin_name,
            school_name,
            school_code: schoolCode,
            student_capacity: studentCapacity.toLocaleString(),
            formatted_amount: `N${totalAmount.toLocaleString()}.00`,
            bank_name: process.env.PAYMENT_BANK_NAME || 'Your Bank Name',
            account_name: process.env.PAYMENT_ACCOUNT_NAME || 'PrepAI Limited',
            account_number: process.env.PAYMENT_ACCOUNT_NUMBER || '0000000000',
            remita_link: process.env.REMITA_LINK || `${APP_URL}/payment/remita`,
            flutterwave_link:
                process.env.FLUTTERWAVE_LINK || `${APP_URL}/payment/flutterwave`,
            support_link: process.env.SUPPORT_LINK || `${APP_URL}/support`,
            year: new Date().getFullYear(),
        });

        await transporter.sendMail({
            from: getMailFrom(),
            to: admin_email,
            subject: `${APP_NAME} registration payment instructions`,
            html,
        });

        return res.status(201).json({
            message: 'Registration successful. Payment instructions sent via email.',
            data: {
                admin_email,
                school_name,
                school_code: schoolCode,
                number_of_students: studentCapacity,
                formatted_amount: `N${totalAmount.toLocaleString()}.00`,
            },
        });
    } catch (error) {
        console.error('Failed to send registration email:', error);
        return res.status(500).json({
            message: 'Registration received, but email delivery failed. Please contact support.',
        });
    }
});

app.listen(API_PORT, async () => {
    try {
        await transporter.verify();
        console.log(`API listening on http://localhost:${API_PORT}`);
        console.log('SMTP connection verified.');
    } catch (error) {
        console.warn('API started, but SMTP verification failed:', error.message);
        console.log(`API listening on http://localhost:${API_PORT}`);
    }
});
