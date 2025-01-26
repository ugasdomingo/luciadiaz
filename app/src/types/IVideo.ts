export interface IVideo {
    _id: string;
    title: string;
    description: string;
    video_url: string;
    cover_image: {
        public_id: string;
        secure_url: string;
    };
    categorys: string[];
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}
