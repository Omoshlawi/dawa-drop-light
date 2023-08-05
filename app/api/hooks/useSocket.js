import { io } from "socket.io-client";
import { BASE_URL } from "../../utils/contants";

const useSocket = () => {
  const socket = io(BASE_URL);

  const subscribe = ({ name, receiver }) => {
    socket.on(name, receiver);
    const unsubscribe = () => {
      socket.off(name, receiver);
    };
    const emit = (data) => {
      socket.emit(name, data);
    };

    const disconect = () => {
      socket.disconnect();
    };

    return {
      name,
      receiver,
      emit,
      unsubscribe,
      disconect,
    };
  };

  return { socket, subscribe };
};

export default useSocket;
