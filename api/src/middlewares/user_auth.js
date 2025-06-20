import jwt from 'jsonwebtoken';
import { User } from '../models/User-model.js';

export const user_auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findById(decoded.id).lean();
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        req.user_id = user._id.toString();
        next();
    } catch (error) {
        next(error);
    }
}

export const admin_auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findById(decoded.id).lean();
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        if (user.role !== 'Admin') {
            throw new Error('Acceso denegado');
        }
        req.user_id = user._id.toString();
        next();
    } catch (error) {
        next(error);
    }
}

