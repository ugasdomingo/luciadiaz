export interface IPost {
    title: string;
    content: string;
    cover: {
        public_id: string;
        secure_url: string;
    };
    category: string;
    tags: string[];
    author: string;
    createdAt: Date;
    updatedAt: Date;
}
