export interface ExamSetup {
    compulsorySubject: string
    selectedSubjects: string[]
    totalQuestions: number
    totalTimeMinutes: number
}

export const EXAM_SETUP_STORAGE_KEY = 'prepai_exam_setup'

export const COMPULSORY_SUBJECT = 'Use of English'

export const AVAILABLE_SUBJECTS = [
    'Mathematics',
    'Agricultural Science',
    'Animal Husbandry',
    'Arabic',
    'Biology',
    'Chemistry',
    'Christian Religious Knowledge (CRK)',
    'Civic Education',
    'Commerce',
    'Computer Studies',
    'Data Processing',
    'Economics',
    'Fine Arts',
    'Food and Nutrition',
    'French',
    'Further Mathematics',
    'Geography',
    'Government',
    'Hausa',
    'History',
    'Home Economics',
    'Igbo',
    'Islamic Religious Knowledge (IRK)',
    'Literature in English',
    'Physics',
    'Yoruba',
]

export const ADDITIONAL_SUBJECTS_REQUIRED = 3

export const QUESTION_DISTRIBUTION = {
    [COMPULSORY_SUBJECT]: 20,
    additionalSubject: 10,
}

export const DEFAULT_EXAM_DURATION_MINUTES = 35

export function createExamSetup(selectedSubjects: string[]): ExamSetup {
    const totalQuestions =
        QUESTION_DISTRIBUTION[COMPULSORY_SUBJECT] +
        selectedSubjects.length * QUESTION_DISTRIBUTION.additionalSubject

    return {
        compulsorySubject: COMPULSORY_SUBJECT,
        selectedSubjects,
        totalQuestions,
        totalTimeMinutes: DEFAULT_EXAM_DURATION_MINUTES,
    }
}

export function saveExamSetup(setup: ExamSetup): void {
    sessionStorage.setItem(EXAM_SETUP_STORAGE_KEY, JSON.stringify(setup))
}

export function loadExamSetup(): ExamSetup | null {
    const raw = sessionStorage.getItem(EXAM_SETUP_STORAGE_KEY)
    if (!raw) return null

    try {
        return JSON.parse(raw) as ExamSetup
    } catch {
        return null
    }
}
