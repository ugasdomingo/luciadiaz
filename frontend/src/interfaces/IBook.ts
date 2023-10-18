export interface IBook {
    title: string;
    type: string;
    description: string;
    price: number;
    sellUrl: string;
    cover: {
        public_id: string;
        secure_url: string;
    };
    author: string;
    category: string;
    tags: string[];
    notes: string[];
    createdAt: Date;
    updatedAt: Date;
}
