export interface ITestResult {
    _id: string;
    uid: string;
    title: string;
    results: string | object;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
