import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocketConnection = () => {
  socket = io(`https://moveo-task-backend.vercel.app`, {
    path: '/socket.io',  
    transports: ['polling']
  });
  return socket;
};


