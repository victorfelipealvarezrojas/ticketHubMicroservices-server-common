import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    email: string;
}

//me permite llegar a una definicion de tipos existentes y llegar a ella para agregar en el request currentUser
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //si no inicia sesion continua pero con usurio no definido xq no tiene token
    if (!req.session?.jwt) return next();

    //si tiene un token definido extrae la data parq que sea utilizada oor otro middleware o controlador
    try {
        const payload = jwt.verify(req.session.jwt,process.env.JWT_KEY!) as UserPayload;

        req.currentUser = payload;

    } catch (err) {}

    next();
};
