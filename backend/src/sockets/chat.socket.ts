import { Server, Socket } from "socket.io";

export default function chatSocket(io: Server, socket: Socket) {
    socket.on('chatMessage', (msg, sender) => {
        io.emit("chatMessage", (msg), sender);
    });
} ''