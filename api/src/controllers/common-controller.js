import { client_response } from "../utils/responses.js";
import { Post } from "../models/Post-model.js";
import { Video } from "../models/Video-model.js";
import { Formation } from "../models/Formation-model.js";

export const home_data = async (req, res, next) => {
    try {
        const promises = [
            Post.find().sort({ createdAt: -1 }).limit(3).lean(),
            Video.find().sort({ createdAt: -1 }).limit(3).lean(),
            Formation.find().sort({ createdAt: -1 }).limit(3).lean(),
        ]
        const [posts, videos, formations] = await Promise.all(promises);
        return client_response(res, 200, 'OK', { posts, videos, formations });
    } catch (error) {
        next(error);
    }
}
