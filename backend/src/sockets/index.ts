import { Server } from "socket.io";
import chatSocket from "./chat.socket";
import { socketAuth } from "./socketAuth";
//import userSocket from "./user.socket";

export default function registerSockets(io: Server) {
    // Register socket auth middleware once, before handling connections
    socketAuth(io);

    io.on("connection", (socket) => {
        console.log("Novo cliente conectado:", socket.user.id);

        // Conecta todos os usuários em uma sala própria para receber notificações
        socket.join(socket.user.id);

        // módulos de eventos
        chatSocket(io, socket);
        //userSocket(io, socket);

        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
        });
    });
}
