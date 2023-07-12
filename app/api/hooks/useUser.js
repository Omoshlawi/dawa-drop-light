import { useUserContext } from "../../context/hooks";
import apiClient from "../client";

const useUser = () => {
  const { token, clearToken } = useUserContext();
  if (token) {
    apiClient.addRequestTransform((request) => {
      // Add the authentication token to the request header.
      request.headers["x-auth-token"] = token;
      return request;
    });
  }
  const getUser = () => apiClient.get("auth/profile");
  const logout = () => clearToken(true);
  return { getUser, logout };
};

export default useUser;
