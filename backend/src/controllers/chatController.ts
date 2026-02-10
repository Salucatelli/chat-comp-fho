import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ExecException } from 'child_process';

const prisma = new PrismaClient();

export const sendMessage = async (req: Request, res: Response) => {
    const { senderId, conversationId, content } = req.body;

    try {
        const newMessage = await prisma.message.create({
            data: {
                senderId,
                conversationId: conversationId,
                content
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
        where: {
            participants: {
                some: { userId }
            }
        },
        include: {
            messages: {
                orderBy: { sendAt: "desc" },
                take: 1,
                include: {
                    sender: {
                        select: { id: true, name: true }
                    }
                }
            },
            _count: {
                select: {
                    messages: {
                        where: {
                            senderId: { not: userId }, // não contar mensagens do próprio usuário
                            messageRead: {
                                none: {
                                    userId
                                }
                            }
                        }
                    }
                }
            }
        }
    });


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

export const getAllMessagesFromConversation = async (req: Request, res: Response) => {
    const { conversationId } = req.params;

    const messages = await prisma.message.findMany({
        where: {
            conversationId: conversationId
        },
        include: {
            sender: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    });

    res.status(200).json({ message: "Mensagens obtidas com sucesso!", messages: messages });
}

export const setmessageAsRead = async (req: Request, res: Response) => {
    const { messageId, userId } = req.body;

    res.status(200).json({ message: "Mensagem marcada como lida com sucesso!" });
}
