# OpenMeet Backend

A real-time video meeting backend server built with Express and Socket.IO.

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The server will start on http://localhost:3000

## Building for Production

```bash
npm run build
```

This will compile TypeScript to JavaScript in the `dist` directory.

## Running in Production

```bash
npm start
```

## Deployment

### Deploying to Render

1. Create a new Web Service
2. Connect your repository
3. Configure the following:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Node Version: 18 or higher

### Environment Variables

- `PORT`: The port the server will listen on (default: 3000)
- `CORS_ORIGIN`: The allowed origin for CORS (default: "*")

## API Endpoints

- `GET /`: Health check endpoint
- WebSocket connection for real-time communication

## Project Structure

```
src/
├── index.ts          # Main application entry point
└── managers/         # Business logic managers
    ├── UserManger.ts # User management
    └── RoomManager.ts # Room management
``` 