import app from "./app";
import { createServer } from 'node:http';
import { Server } from "socket.io";
import registerSockets from "./sockets/index";

const PORT = 3000;
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

registerSockets(io);

// called when the user connects
// io.on("connection", (socket) => {
//     console.log("User conneted");
//     socket.on('chatMessage', (msg, sender) => {
//         io.emit("chatMessage", (msg), sender);
//     });
// });

// initializes the server
server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
