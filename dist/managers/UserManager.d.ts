import { Socket } from "socket.io";
export interface User {
    name: string;
    socket: Socket;
}
export declare class UserManager {
    private users;
    private queue;
    private roomManager;
    constructor();
    addUser(socket: Socket): void;
    removeUser(socketId: string): void;
    addNextUser(user1: Socket, user2: Socket): void;
    clearQueue(): void;
    initHandlers(socket: Socket): void;
}
