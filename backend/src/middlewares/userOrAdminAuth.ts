//Import tools
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

interface JwtPayload {
    uid: string;
}

export const userOrAdminAuth = async (req: any, res: any, next: any) => {
    try {
        let token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                msg: 'Debes hacer login para ver este contenido',
            });
        }

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

        if (user.role == 'Admin' || user.role == 'User') {
            req.uid = uid;
            next();
        } else {
            return res.status(401).json({
                msg: 'No tienes permisos para ver este contenido',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Error verifying token',
        });
    }
};
