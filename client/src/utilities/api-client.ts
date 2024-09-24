import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocketConnection = () => {
  socket = io(`https://moveo-task-backend.vercel.app`, {
    transports: ['polling'], // Force polling since WebSockets are not supported
  });
  return socket;
};
