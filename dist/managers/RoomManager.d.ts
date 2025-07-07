import { Socket } from "socket.io";
export declare class RoomManager {
    private rooms;
    private userManager;
    constructor();
    createRoom(user1: Socket, user2: Socket): void;
    onOffer(roomId: string, sdp: string, senderSocketId: string): void;
    onAnswer(roomId: string, sdp: string, senderSocketId: string): void;
    onIceCandidates(roomId: string, senderSocketId: string, candidate: any): void;
    onNextUser(roomId: string, socketId: string): void;
    generate(): string;
}
