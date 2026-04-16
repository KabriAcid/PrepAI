import { Question, Quiz as QuizType } from '@/types/quiz';
import {
    COMPULSORY_SUBJECT,
    QUESTION_DISTRIBUTION,
} from '@/utils/exam-setup';

export type SubjectTab = {
    subject: string;
    startIndex: number;
    endIndex: number;
};

type QuestionTemplate = {
    question: string;
    choices: string[];
    correctAnswer: number;
    explanation: string;
};

const SUBJECT_TEMPLATES: Record<string, QuestionTemplate[]> = {
    [COMPULSORY_SUBJECT]: [
        {
            question:
                'Choose the option that best completes the sentence: The chairman, together with his aides, ___ arriving shortly.',
            choices: ['are', 'were', 'is', 'have'],
            correctAnswer: 2,
            explanation:
                'The subject is "chairman" (singular), so the correct verb is "is".',
        },
        {
            question: 'Identify the correctly punctuated sentence.',
            choices: [
                'After the game we went home.',
                'After the game, we went home.',
                'After, the game we went home.',
                'After the game we, went home.',
            ],
            correctAnswer: 1,
            explanation:
                'A comma follows an introductory phrase: "After the game, ..."',
        },
    ],
    Mathematics: [
        {
            question: 'If 3x + 5 = 20, find x.',
            choices: ['3', '4', '5', '6'],
            correctAnswer: 2,
            explanation: '3x = 15, so x = 5.',
        },
        {
            question: 'What is the value of 7^2 - 5^2?',
            choices: ['12', '20', '24', '49'],
            correctAnswer: 2,
            explanation: '49 - 25 = 24.',
        },
    ],
    Biology: [
        {
            question:
                'Which organelle is responsible for energy production in cells?',
            choices: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Vacuole'],
            correctAnswer: 1,
            explanation:
                'Mitochondria are the site of ATP production during respiration.',
        },
        {
            question: 'The process by which green plants make food is called:',
            choices: ['Respiration', 'Diffusion', 'Photosynthesis', 'Transpiration'],
            correctAnswer: 2,
            explanation:
                'Photosynthesis uses sunlight, carbon dioxide and water to form glucose.',
        },
    ],
    Chemistry: [
        {
            question: 'The pH of a neutral solution at room temperature is:',
            choices: ['1', '7', '10', '14'],
            correctAnswer: 1,
            explanation: 'A neutral aqueous solution has pH 7.',
        },
        {
            question: 'Which particle has a negative charge?',
            choices: ['Proton', 'Neutron', 'Electron', 'Nucleus'],
            correctAnswer: 2,
            explanation: 'Electrons carry negative charge.',
        },
    ],
    Physics: [
        {
            question: 'The SI unit of force is:',
            choices: ['Joule', 'Pascal', 'Newton', 'Watt'],
            correctAnswer: 2,
            explanation: 'Force is measured in newtons (N).',
        },
        {
            question: 'Speed is defined as distance divided by:',
            choices: ['Time', 'Mass', 'Acceleration', 'Force'],
            correctAnswer: 0,
            explanation: 'Speed = distance / time.',
        },
    ],
};

const getTemplatesForSubject = (subject: string): QuestionTemplate[] =>
    SUBJECT_TEMPLATES[subject] ?? SUBJECT_TEMPLATES[COMPULSORY_SUBJECT];

const buildExamQuestions = (
    subject: string,
    count: number,
    prefix: string,
): Question[] => {
    const templates = getTemplatesForSubject(subject);
    return Array.from({ length: count }, (_, i) => {
        const template = templates[i % templates.length];
        return {
            id: `${prefix}-${i + 1}`,
            type: 'mcq',
            question: `${subject}: ${template.question}`,
            choices: template.choices,
            correctAnswer: template.correctAnswer,
            explanation: template.explanation,
            difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard',
            category: 'quran',
            points: 2,
        };
    });
};

export const buildQuizFromSetup = (selectedSubjects: string[]): QuizType => {
    const questions: Question[] = [
        ...buildExamQuestions(
            COMPULSORY_SUBJECT,
            QUESTION_DISTRIBUTION[COMPULSORY_SUBJECT],
            'english',
        ),
        ...selectedSubjects.flatMap((subject) =>
            buildExamQuestions(
                subject,
                QUESTION_DISTRIBUTION.additionalSubject,
                subject.toLowerCase().replace(/\s+/g, '-'),
            ),
        ),
    ];

    return {
        id: `jamb-${selectedSubjects.join('-').toLowerCase().replace(/\s+/g, '-')}`,
        title: 'JAMB Mock CBT',
        description: 'AI-powered mock exam simulation',
        timeLimit: 35 * 60,
        category: 'jamb-cbt',
        difficulty: 'medium',
        totalPoints: questions.length * 2,
        questions,
    };
};

export const buildSubjectTabs = (selectedSubjects: string[]): SubjectTab[] => {
    const subjects = [COMPULSORY_SUBJECT, ...selectedSubjects];
    let runningIndex = 0;

    return subjects.map((subject, index) => {
        const count =
            index === 0
                ? QUESTION_DISTRIBUTION[COMPULSORY_SUBJECT]
                : QUESTION_DISTRIBUTION.additionalSubject;
        const startIndex = runningIndex;
        const endIndex = runningIndex + count - 1;
        runningIndex += count;

        return { subject, startIndex, endIndex };
    });
};

export const formatTime = (seconds: number): string => {
    const mins = Math.floor(Math.max(seconds, 0) / 60);
    const secs = Math.max(seconds, 0) % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
