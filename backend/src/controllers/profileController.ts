import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfile = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: { id: (req as any).userId },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    if (!user) {
        return res.status(404).json({ message: "Usuário nao encontrado" });
    }

    res.status(200).json({ message: "Autenticado com sucesso!", user: user });
}