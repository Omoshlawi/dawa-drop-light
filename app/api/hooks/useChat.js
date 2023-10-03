import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const useChat = () => {
  addTokenInterceptor();
  const getEventChats = (eventId, params) =>
    apiClient.get(`chats/${eventId}`, params);
  const addChat = (eventId, data) =>
    apiClient.post(`chats/${eventId}`, data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });

  return {
    getEventChats,
    addChat,
  };
};

export default useChat;
