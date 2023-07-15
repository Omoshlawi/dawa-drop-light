import { useUserContext } from "../../context/hooks";
import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const useUser = () => {
  const { clearToken } = useUserContext();
  addTokenInterceptor();
  const getUser = () => apiClient.get("auth/profile");
  const logout = () => clearToken(true);
  const changePassword = (data) => apiClient.post("auth/change-password", data);
  const updateProfile = (data) =>
    apiClient.post("auth/profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  const getMenuOptions = () => apiClient.get("/auth/my-menu-options");
  return { getUser, logout, changePassword, updateProfile, getMenuOptions };
};

export default useUser;
