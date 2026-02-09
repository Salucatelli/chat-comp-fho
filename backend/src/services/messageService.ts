import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function sendMessage({ senderId, conversationId, content }: { senderId: string; conversationId: string; content: string }) {
    try {
        if (!content.trim()) {
            throw new Error("Mensagem vazia");
        }

        //valida se usuário participa da conversa
        const isParticipant = await prisma.conversationParticipant.findFirst({
            where: {
                userId: senderId,
                conversationId,
            },
        });

        if (!isParticipant) {
            throw new Error("Usuário não participa da conversa");
        }

        //console.log("id: " + conversationId);

        return prisma.message.create({
            data: {
                content,
                senderId,
                conversationId,
            },
        });
    }
    catch (e) {
        console.log(e);
    }


}

