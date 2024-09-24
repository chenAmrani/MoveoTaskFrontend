import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocketConnection = () => {
     socket = io(`http://localhost:3000`); 
  return socket;
};
