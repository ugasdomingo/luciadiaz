export interface IFormation {
    _id: string;
    title: string;
    landing_page: string;
    type: string;
    content: string;
    description: string;
    duration: string;
    location: string;
    price: number;
    date: Date;
    categorys: string[];
    video_url: string;
    cover_image: {
        public_id: string;
        secure_url: string;
    };
    paypal_button: string;
    status: string;
    users_enrolled: string[];
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}
