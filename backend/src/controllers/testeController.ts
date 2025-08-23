import { Request, Response } from "express";

export const testeController = {
    getAll: (req: Request, res: Response): void => {
        res.send("Resposta para o teste");
    },
    setTeste: (req: Request, res: Response): void => {
        res.send("Teste para adiconar");
    }
};
