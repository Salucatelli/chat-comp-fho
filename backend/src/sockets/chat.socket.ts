import { Server, Socket } from "socket.io";
import { sendMessage } from '../services/messageService';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function chatSocket(io: Server, socket: Socket) {

    // Recebe uma mensagem enviada pelo frontend e trata ela
    socket.on('chatMessage', async (msg) => {
        console.log(msg);
        const message = await sendMessage({ senderId: msg.sender.id, conversationId: msg.to, content: msg.message });

        console.log("criada uma mensagem " + message);

        io.to(msg.to).emit("chatMessage", (msg), msg.sender);
        // console.log(msg.message);
        // console.log(msg.to);
    });

    socket.on("joinConversation", async (conversationId) => {
        const isParticipant = await prisma.conversationParticipant.findFirst({
            where: {
                conversationId,
                userId: socket.user.id,
            },
        });

        if (!isParticipant) return;

        socket.join(conversationId);
        console.log("Joined conversation " + conversationId);
    });

    socket.on("leaveConversation", async (conversationId) => {
        socket.leave(conversationId);
        console.log("Leaved conversation " + conversationId);
    });
} ''