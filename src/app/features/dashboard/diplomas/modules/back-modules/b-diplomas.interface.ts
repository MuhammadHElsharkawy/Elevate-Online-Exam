export interface BDiplomas {
    status:  boolean;
    code:    number;
    payload: Payloads;
}

interface Payloads {
    data:     Datum[];
    metadata: Metadata;
}

interface Datum {
    id:          string;
    title:       string;
    description: string;
    image:       string;
    immutable:   boolean;
    createdAt:   Date;
    updatedAt:   Date;
}

interface Metadata {
    page:       number;
    limit:      number;
    total:      number;
    totalPages: number;
}




export interface BDiploma {
    status:  boolean;
    code:    number;
    payload: Payload;
}

interface Payload {
    diploma: Diploma;
}

interface Diploma {
    id:          string;
    title:       string;
    description: string;
    image:       string;
    immutable:   boolean;
    createdAt:   Date;
    updatedAt:   Date;
    exams:       Exam[];
}

interface Exam {
    id:             string;
    title:          string;
    description:    string;
    image:          string;
    duration:       number;
    createdAt:      Date;
    questionsCount: number;
}
