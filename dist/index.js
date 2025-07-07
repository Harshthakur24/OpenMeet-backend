"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
// Use CORS for cross-origin requests
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"]
}));
// Health check endpoint for Render
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'OpenMeet Backend Server is running',
        timestamp: new Date().toISOString()
    });
});
// Initialize Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || "*",
        methods: ["GET", "POST"]
    }
});
let senderSocket = null;
let receiverSocket = null;
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.on('sender', () => {
        console.log("sender added");
        senderSocket = socket;
    });
    socket.on('receiver', () => {
        console.log("receiver added");
        receiverSocket = socket;
    });
    socket.on('createOffer', (data) => {
        if (socket !== senderSocket) {
            return;
        }
        console.log("sending offer");
        receiverSocket?.emit('createOffer', { sdp: data.sdp });
    });
    socket.on('createAnswer', (data) => {
        if (socket !== receiverSocket) {
            return;
        }
        console.log("sending answer");
        senderSocket?.emit('createAnswer', { sdp: data.sdp });
    });
    socket.on('iceCandidate', (data) => {
        console.log("sending ice candidate");
        if (socket === senderSocket) {
            receiverSocket?.emit('iceCandidate', { candidate: data.candidate });
        }
        else if (socket === receiverSocket) {
            senderSocket?.emit('iceCandidate', { candidate: data.candidate });
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        if (socket === senderSocket) {
            senderSocket = null;
        }
        else if (socket === receiverSocket) {
            receiverSocket = null;
        }
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 OpenMeet Backend Server running on port ${PORT}`);
    console.log(`📡 Socket.IO server ready for connections`);
});
//# sourceMappingURL=index.js.map