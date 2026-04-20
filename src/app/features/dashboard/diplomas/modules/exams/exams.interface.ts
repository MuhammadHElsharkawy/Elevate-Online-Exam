export interface IExams {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: number;
    immutable: boolean;
    questionsCount: number;
    diploma: Diploma;
}
interface Diploma {
    id: string;
    title: string;
}

