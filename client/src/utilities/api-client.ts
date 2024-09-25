import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocketConnection = () => {
  socket = io('https://tom-live-code.up.railway.app'); 
  return socket;
};


