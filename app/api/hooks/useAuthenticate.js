import apiClient from "../client";

const useAuthenticate = () => {
  const login = (data) => apiClient.post("auth/login", data);
  const register = (data) => apiClient.post("auth/register", data);
  return { login, register };
};

export default useAuthenticate;
