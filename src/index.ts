import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { UserManager } from "./managers/UserManger";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

const userManager = new UserManager();

app.get('/', (req, res) => {
  res.send('OpenMeet Backend Server is running!');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  userManager.addUser("randomName", socket);
  socket.on('disconnect', () => {
    console.log('User disconnected');
    userManager.removeUser(socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});