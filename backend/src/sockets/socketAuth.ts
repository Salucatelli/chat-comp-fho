import { Server, Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
    id?: string;
    sub?: string;
    email: string;
}

export function socketAuth(io: Server): void {
    io.use((socket: Socket, next) => {
        const token = socket.handshake.auth?.token as string | undefined;

        if (!token) {
            return next(new Error("Token não fornecido"));
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as TokenPayload;

            socket.user = {
                id: decoded.id as string,
                email: decoded.email,
            };

            next();
        } catch (err) {
            next(new Error("Token inválido"));
        }
    });
}
