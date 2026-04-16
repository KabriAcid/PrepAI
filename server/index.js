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

app.post('/api/register', async (req, res) => {
    const payload = req.body || {};

    if (!payload.account_type) {
        return res.status(400).json({ message: 'account_type is required.' });
    }

    if (payload.account_type === 'student') {
        if (!payload.name || !isEmail(payload.email) || !payload.password) {
            return res.status(400).json({
                message: 'Student registration requires valid name, email and password.',
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
