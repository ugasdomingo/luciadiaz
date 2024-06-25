//Import tools
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

interface JwtPayload {
    uid: string;
}

export const userAuth = async (req: any, res: any, next: any) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                msg: 'Debes hacer login para ver este contenido',
            });
        }

        token = token.split(' ')[1];
        const { uid } = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        //Get user
        const user: IUser | null = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token not valid',
            });
        }

        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Error verifying token',
        });
    }
};
