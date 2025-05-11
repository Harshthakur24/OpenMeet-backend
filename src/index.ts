import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { UserManager } from './managers/UserManger';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const userManager = new UserManager();

app.get('/', (req, res) => {
  res.send('OpenMeet Backend Server is running!');
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  userManager.addUser('randomName', socket);
  socket.on('disconnect', () => {
    console.log('user disconnected');
    userManager.removeUser(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});