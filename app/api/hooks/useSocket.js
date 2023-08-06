import { io } from "socket.io-client";
import { BASE_URL } from "../../utils/contants";
import { useUserContext } from "../../context/hooks";

const useSocket = (namespace) => {
  const { token } = useUserContext();
  const uri = `${BASE_URL}${namespace}`;
  const socket = io(uri, { query: { token } });
  const subscribe = ({ name, receiver }) => {
    socket.on(name, receiver);
    const unsubscribe = () => {
      socket.off(name, receiver);
    };
    const emit = (data) => {
      socket.emit(name, data);
    };

    return {
      name,
      receiver,
      emit,
      unsubscribe,
    };
  };
  const disconect = () => {
    socket.disconnect();
  };

  return { socket, subscribe, disconect };
};

export default useSocket;
