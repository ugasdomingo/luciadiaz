export interface IPost {
    _id: string;
    title: string;
    content: string;
    cover_image: {
        public_id: string;
        secure_url: string;
    };
    categorys: string[];
    likes: number;
    video_url: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}
