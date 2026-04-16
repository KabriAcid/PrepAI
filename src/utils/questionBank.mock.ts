// questionBank.mock.ts

export type Difficulty = "easy" | "medium" | "hard";

export interface QuestionOption {
    key: string;
    text: string;
}

export interface MockQuestion {
    id: string;
    subject: string;
    topic: string;
    question: string;
    options: QuestionOption[];
    correctOptionKey: string;
    explanation: string;
    difficulty: Difficulty;
    year: number;
    tags: string[];
}

export interface SubjectQuestionBank {
    subject: string;
    questions: MockQuestion[];
}

// ---------- Utilities ----------
const normalize = (s: string) => s.trim().toLowerCase();

const shuffleArray = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(i * 9301 + 49297) % (i + 1);
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

// ---------- Helper ----------
const createOptions = (opts: string[]): QuestionOption[] =>
    opts.map((text, i) => ({
        key: String.fromCharCode(65 + i),
        text,
    }));

// ---------- Subjects ----------
export const SUBJECTS: string[] = [
    "Use of English",
    "Mathematics",
    "Biology",
    "Chemistry",
    "Physics",
    "Economics",
    "Government",
    "Literature in English",
    "Geography",
    "Agricultural Science",
    "Commerce",
    "Civic Education",
    "Christian Religious Knowledge (CRK)",
    "Islamic Religious Knowledge (IRK)",
    "Data Processing",
    "Computer Studies",
];

// ---------- Question Generators ----------
const generateQuestions = (
    subject: string,
    count: number,
    baseId: string
): MockQuestion[] => {
    const topics = ["General", "Theory", "Application"];
    const difficulties: Difficulty[] = ["easy", "medium", "hard"];

    return Array.from({ length: count }).map((_, i) => {
        const options = createOptions([
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4",
        ]);

        return {
            id: `${baseId}-${String(i + 1).padStart(3, "0")}`,
            subject,
            topic: topics[i % topics.length],
            question: `${subject}: Sample question ${i + 1}?`,
            options,
            correctOptionKey: options[0].key,
            explanation: `Correct because Option 1 best answers the question.`,
            difficulty: difficulties[i % difficulties.length],
            year: 2010 + (i % 15),
            tags: [subject.toLowerCase(), "mock"],
        };
    });
};

// ---------- Data ----------
export const QUESTION_BANK: Record<string, SubjectQuestionBank> = {
    "use of english": {
        subject: "Use of English",
        questions: generateQuestions("Use of English", 30, "use-of-english"),
    },
    mathematics: {
        subject: "Mathematics",
        questions: generateQuestions("Mathematics", 15, "mathematics"),
    },
    biology: {
        subject: "Biology",
        questions: generateQuestions("Biology", 15, "biology"),
    },
    chemistry: {
        subject: "Chemistry",
        questions: generateQuestions("Chemistry", 15, "chemistry"),
    },
    physics: {
        subject: "Physics",
        questions: generateQuestions("Physics", 15, "physics"),
    },
    economics: {
        subject: "Economics",
        questions: generateQuestions("Economics", 15, "economics"),
    },
    government: {
        subject: "Government",
        questions: generateQuestions("Government", 15, "government"),
    },
    "literature in english": {
        subject: "Literature in English",
        questions: generateQuestions("Literature in English", 15, "literature"),
    },
    geography: {
        subject: "Geography",
        questions: generateQuestions("Geography", 15, "geography"),
    },
    "agricultural science": {
        subject: "Agricultural Science",
        questions: generateQuestions("Agricultural Science", 15, "agric"),
    },
    commerce: {
        subject: "Commerce",
        questions: generateQuestions("Commerce", 15, "commerce"),
    },
    "civic education": {
        subject: "Civic Education",
        questions: generateQuestions("Civic Education", 15, "civic"),
    },
    "christian religious knowledge (crk)": {
        subject: "Christian Religious Knowledge (CRK)",
        questions: generateQuestions("CRK", 15, "crk"),
    },
    "islamic religious knowledge (irk)": {
        subject: "Islamic Religious Knowledge (IRK)",
        questions: generateQuestions("IRK", 15, "irk"),
    },
    "data processing": {
        subject: "Data Processing",
        questions: generateQuestions("Data Processing", 15, "data"),
    },
    "computer studies": {
        subject: "Computer Studies",
        questions: generateQuestions("Computer Studies", 15, "cs"),
    },
};

// ---------- APIs ----------
export function getQuestionsBySubject(subject: string): MockQuestion[] {
    const key = normalize(subject);
    return QUESTION_BANK[key]?.questions ?? [];
}

export function getQuestionsForMock(
    subjects: string[],
    config?: {
        useOfEnglishCount?: number;
        perOtherSubjectCount?: number;
        shuffle?: boolean;
    }
): MockQuestion[] {
    const useCount = config?.useOfEnglishCount ?? 20;
    const otherCount = config?.perOtherSubjectCount ?? 10;
    const shouldShuffle = config?.shuffle ?? false;

    const result: MockQuestion[] = [];
    const usedIds = new Set<string>();

    // Always include Use of English
    const eng = QUESTION_BANK["use of english"];
    if (eng) {
        const selected = eng.questions.slice(0, useCount);
        selected.forEach((q) => {
            if (!usedIds.has(q.id)) {
                usedIds.add(q.id);
                result.push(q);
            }
        });
    }

    subjects.forEach((sub) => {
        const key = normalize(sub);
        if (key === "use of english") return;

        const bank = QUESTION_BANK[key];
        if (!bank) return;

        const selected = bank.questions.slice(0, otherCount);
        selected.forEach((q) => {
            if (!usedIds.has(q.id)) {
                usedIds.add(q.id);
                result.push(q);
            }
        });
    });

    return shouldShuffle ? shuffleArray(result) : result;
}