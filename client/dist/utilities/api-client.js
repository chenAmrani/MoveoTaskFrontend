import { io } from 'socket.io-client';
let socket;
export const initSocketConnection = () => {
    socket = io('https://tom-live-code.up.railway.app');
    return socket;
};
