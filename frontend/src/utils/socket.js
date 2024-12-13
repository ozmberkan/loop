import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_MAIN_URL, {
  transports: ["websocket"],
});

export default socket;
