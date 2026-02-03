import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ExecException } from 'child_process';

const prisma = new PrismaClient();

export const sendMessage = async (req: Request, res: Response) => {
    const { senderId, conversarionId, message } = req.body;

    try {
        const newMessage = await prisma.message.create({
            data: {
                senderId,
                conversationId: conversarionId,
                content: message
            }
        });

        res.status(201).json({ message: "Mensagem enviada com sucesso!", content: newMessage });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getAllContacts = async (req: Request, res: Response) => {
    const contacts = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        }
    })

    res.status(200).json({ message: "Contatos obtidos com sucesso!", contacts: contacts });
}

export const getAllConversations = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const contacts = await prisma.conversation.findMany({
        select: {
            id: true,
            title: true,
            isGroup: true
        }, where: {
            participants: {
                some: {
                    userId: userId
                }
            }
        }
    })

    res.status(200).json({ message: "Conversas obtidos com sucesso!", conversations: contacts });
}

export const createConversation = async (req: Request, res: Response) => {
    const { title, contact1, contact2 } = req.body;

    //console.log(contact1, contact2);

    var conv = await prisma.conversation.create({
        data: {
            title,
            isGroup: false,
            participants: {
                create: [
                    { userId: contact1 },
                    { userId: contact2 }
                ]
            }
        }
    });

    res.status(200).json({ message: "Conversa criada com sucesso!", conv });
}

