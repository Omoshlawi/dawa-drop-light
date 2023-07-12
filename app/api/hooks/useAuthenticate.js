import apiClient from "../client";

const useAuthenticate = () => {
  const login = (data) => apiClient.post("auth/login", data);
  const register = (data) => apiClient.post("auth/register", data);
  const logout = () => {
    const { clearToken } = useUserContext();
    clearToken();
  };

  return { login, register, logout };
};

export default useAuthenticate;
