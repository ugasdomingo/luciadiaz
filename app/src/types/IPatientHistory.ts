export interface IPatientHistory {
    _id: string;
    uid: string;
    title: string;
    answers: string | object;
    createdAt: Date;
    updatedAt: Date;
}

export interface IHistory {
    _id: string;
    title: string;
    answers: {
        question: string;
        answer: string;
    }[];
}
