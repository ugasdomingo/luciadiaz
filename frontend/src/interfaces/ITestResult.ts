export interface ITestResult {
    _id: string;
    testTitle: string;
    answers: { [key: string]: any };
    uid: string;
    createdAt: Date;
    updatedAt: Date;
}
