export interface IMedicalRecord {
    _id: string;
    uid: string;
    medical_record: string;
    patient_history: string[];
    test_results: string[];
    liked_posts: string[];
    liked_formations: string[];
    liked_videos: string[];
    therapies_notes: string[];
    formations_enrolled: string[];
    assigned_tasks: string[];
    createdAt: Date;
    updatedAt: Date;
}
