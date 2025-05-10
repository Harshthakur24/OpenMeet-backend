"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = require("socket.io");
const UserManager_1 = require("./managers/UserManager");
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const userManager = new UserManager_1.UserManager();
io.on('connection', (socket) => {
    console.log('a user connected');
    userManager.addUser(socket);
    socket.on("disconnect", () => {
        console.log('Disconnected');
        userManager.removeUser(socket.id);
    });
});
server.listen(3000, () => {
    console.log('listening on :3000');
});
const url = `https://omegle-clone-68e8.onrender.com/`;
const interval = 300000;
function reloadWebsite() {
    fetch(url, { method: 'GET' })
        .then(response => {
        console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
        .catch(error => {
        console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}
setInterval(reloadWebsite, interval);
