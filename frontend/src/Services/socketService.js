import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // backend

export const socket = io(SOCKET_URL, {
    transports: ["websocket"], // força websocket
    autoConnect: false,        // conecta manualmente
    auth: { token: localStorage.getItem("token") }
});
