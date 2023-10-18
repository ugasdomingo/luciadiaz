export interface ITestResult {
    _id: string;
    testTitle: string;
    answers: { [key: string]: number };
    uid: string;
    createdAt: Date;
    updatedAt: Date;
}
