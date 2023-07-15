import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const useAuthorize = () => {
  addTokenInterceptor();
  const getRoles = (params) => apiClient.get("auth/roles", params);
  const addRoles = (data) => apiClient.post("auth/roles", data);
  const updateRole = (_id, data) => apiClient.put(`auth/roles/${_id}`, data);
  const getPrivileges = (params) => apiClient.get("auth/privileges", params);
  const getMenuOptions = (params) => apiClient.get("auth/menu-options", params);
  return { getRoles, getPrivileges, addRoles, updateRole, getMenuOptions };
};

export default useAuthorize;
