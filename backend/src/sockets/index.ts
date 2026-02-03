import { Server } from "socket.io";
import chatSocket from "./chat.socket";
import { socketAuth } from "./socketAuth";
//import userSocket from "./user.socket";

export default function registerSockets(io: Server) {
    io.on("connection", (socket) => {
        socketAuth(io);

        console.log("Novo cliente conectado:", socket.id);

        // módulos de eventos
        chatSocket(io, socket);
        //userSocket(io, socket);

        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
        });
    });
}
