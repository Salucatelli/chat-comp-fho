import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

// Extensão do tipo Request para incluir o usuário (Pelo que eu entendi isso serve para você incluir o usuario na requisição, então depois que a rqeuisição passar do middleware, você vai ter acesso ao usuário para usar as informações dele)

interface jwtPayload {
    id: string;
    email: string;
}

interface AuthenticatedRequest extends Request {
    userId?: string;
}

const prisma = new PrismaClient();

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    //console.log(token);

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
        if (err) {
            console.error(err);
            return res.sendStatus(401); // Unauthorized
        }

        const payload = decoded as jwtPayload;
        //const user = await prisma.user.findUnique({ where: { id: payload.id } });

        // Retorna apenas o Id do usuário para ser possível buscar o mesmo
        req.userId = payload.id;
        next();
    });
};