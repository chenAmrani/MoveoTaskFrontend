import { io} from 'socket.io-client';

// let socket: Socket;

  export const initSocketConnection = () => {
    return io("https://moveo-task-backend.vercel.app", {
      path: "/socket.io", 
      withCredentials: true
  });
  // return socket;
};


