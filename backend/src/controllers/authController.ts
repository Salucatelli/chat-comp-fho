import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ExecException } from 'child_process';

const prisma = new PrismaClient();

// Register a new user
export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {

        // Verifica se o email já está sendo usado
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ message: "Email já cadastrado" });
        }

        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Cria um novo usuário
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword
            }
        });

        res.status(201).json({ message: "Usuário criado com sucesso!", user: { id: newUser.id, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Login ass a existing user
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //console.log("email e senha: " + email, password);
    try {
        // Procura o usuario na tabela
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Verifica se a senha bate
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: "Email ou senha inválidos" });
        }

        // Gera o token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        const returningUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        res.status(200).json({ message: "Login bem sucedido!", token, user: returningUser });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
}