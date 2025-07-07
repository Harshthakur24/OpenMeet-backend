import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

// Use CORS for cross-origin requests
app.use(cors({
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
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"]
  }
});

let senderSocket: any = null;
let receiverSocket: any = null;

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
    } else if (socket === receiverSocket) {
      senderSocket?.emit('iceCandidate', { candidate: data.candidate });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (socket === senderSocket) {
      senderSocket = null;
    } else if (socket === receiverSocket) {
      receiverSocket = null;
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 OpenMeet Backend Server running on port ${PORT}`);
  console.log(`📡 Socket.IO server ready for connections`);
});
