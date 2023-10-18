export interface IFormation {
    title: string;
    description: string;
    type: string;
    cover: {
        public_id: string;
        secure_url: string;
    };
    price: number;
    duration: number;
    location: string;
    initialDate: Date;
    category: string;
    tags: string[];
    paypalButton: string;
    videoUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
