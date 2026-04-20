export interface BExams {
    status: boolean;
    code: number;
    payload: ExamsPayload;
}

interface ExamsPayload {
    data: Datum[];
    metadata: Metadata;
}

interface Datum {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: number;
    diplomaId: string;
    immutable: boolean;
    createdAt: Date;
    updatedAt: Date;
    diploma: ExamsDiploma;
    questionsCount: number;
}

interface ExamsDiploma {
    id: string;
    title: string;
}

interface Metadata {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}




export interface BExam {
    status: boolean;
    code: number;
    payload: ExamPayload;
}

interface ExamPayload {
    exam: Exam;
}

interface Exam {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: number;
    immutable: boolean;
    createdAt: Date;
    updatedAt: Date;
    questionsCount: number;
    diploma: ExamDiploma;
    diplomaId: string;
}

interface ExamDiploma {
    id: string;
    title: string;
    description: string;
    image: string;
}
