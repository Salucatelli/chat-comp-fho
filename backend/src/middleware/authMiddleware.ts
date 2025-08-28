import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extensão do tipo Request para incluir o usuário (Pelo que eu entendi isso serve para você incluir o usuario na requisição, então depois que a rqeuisição passar do middleware, você vai ter acesso ao usuário para usar as informações dele)
interface AuthenticatedRequest extends Request {
    user?: string | object;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(token);

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            console.error(err);
            return res.sendStatus(403); // Forbidden
        }

        req.user = user;
        next();
    });
};