export interface IUser {
    _id: string;
    name: string;
    email: string;
    email_verified: boolean;
    phone: string;
    role: string;
    medical_record: string;
    policy_accepted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
