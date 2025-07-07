"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const RoomManager_1 = require("./RoomManager");
class UserManager {
    constructor() {
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManager_1.RoomManager();
    }
    addUser(socket) {
        this.users.push(socket);
        this.queue.push(socket.id);
        socket.send("lobby");
        this.clearQueue();
        this.initHandlers(socket);
    }
    removeUser(socketId) {
        const user = this.users.find(x => x.id === socketId);
        this.users = this.users.filter(x => x.id !== socketId);
        this.queue = this.queue.filter(x => x !== socketId);
    }
    addNextUser(user1, user2) {
        this.queue.push(user1.id);
        this.queue.push(user2.id);
        this.clearQueue();
    }
    clearQueue() {
        if (this.queue.length < 2) {
            return;
        }
        const user1_socketId = this.queue.pop();
        const user2_socketId = this.queue.pop();
        const user1 = this.users.find(x => x.id === user1_socketId);
        const user2 = this.users.find(x => x.id === user2_socketId);
        if (!user1 || !user2) {
            return;
        }
        const room = this.roomManager.createRoom(user1, user2);
        this.clearQueue();
    }
    initHandlers(socket) {
        socket.on("offer", ({ sdp, roomId }) => {
            console.log("offer received");
            this.roomManager.onOffer(roomId, sdp, socket.id);
        });
        socket.on("answer", ({ sdp, roomId }) => {
            this.roomManager.onAnswer(roomId, sdp, socket.id);
            console.log("answer received");
        });
        socket.on("add-ice-candidate", ({ candidate, roomId }) => {
            console.log("add-ice-candidate received");
            this.roomManager.onIceCandidates(roomId, socket.id, candidate);
        });
        socket.on("next-user", ({ roomId }) => {
            console.log('next user');
            this.roomManager.onNextUser(socket.id, roomId);
            console.log("next-user");
        });
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=UserManager.js.map