import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket: Socket;

    constructor() {
        this.socket = io('http://localhost:3000'); // endereço do seu backend
    }

    // function for sending messages
    sendMessage(msg: string, user: string) {
        this.socket.emit('chatMessage', msg, this.socket.id);
    }

    // function for receeving messages
    onMessage(callback: (msg: string, user: string) => void) {
        this.socket.on('chatMessage', callback);
    }
}
