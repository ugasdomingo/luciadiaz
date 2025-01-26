export interface IEnrollment {
    _id: string;
    uid: string;
    fid: string;
    payment_method: string;
    payment_status: string;
    payment_proof: {
        public_id: string;
        secure_url: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
