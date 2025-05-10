"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
let GLOBAL_ROOM_ID = 1;
class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    createRoom(user1, user2) {
        const roomId = this.generate();
        this.rooms.set(roomId.toString(), { user1, user2 });
        user1.emit("send-offer", { roomId });
        // user2.emit("send-offer", { roomId });
    }
    //TODO: remove room
    onOffer(roomId, sdp, senderSocketId) {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        // const receivingUser = room.user1.socket.id === senderSocketId ? room.user2 : room.user1;
        const receivingUser = room.user2;
        receivingUser.emit("offer", { sdp, roomId });
        console.log("offer sent to receiver");
    }
    onAnswer(roomId, sdp, senderSocketId) {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        // const receivingUser = room.user1.socket.id === senderSocketId ? room.user2 : room.user1;
        const sendingUser = room.user1;
        sendingUser.emit("answer", { sdp, roomId });
    }
    onIceCandidates(roomId, senderSocketId, candidate) {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        const otherUser = room.user1.id === senderSocketId ? room.user2 : room.user1;
        otherUser.emit("add-ice-candidate", ({ candidate }));
    }
    generate() {
        return (GLOBAL_ROOM_ID++).toString();
    }
}
exports.RoomManager = RoomManager;
