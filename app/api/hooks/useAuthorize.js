import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const useAuthorize = () => {
  addTokenInterceptor();
  const getRoles = (params) => apiClient.get("auth/roles", params);
  const addRoles = (data) => apiClient.post("auth/roles", data);
  const addPrivilege = (data) => apiClient.post("auth/privileges", data);
  const updateRole = (_id, data) => apiClient.put(`auth/roles/${_id}`, data);
  const updatePrivilege = (_id, data) =>
    apiClient.put(`auth/privileges/${_id}`, data);
  const getPrivileges = (params) => apiClient.get("auth/privileges", params);
  const getMenuOptions = (params) => apiClient.get("auth/menu-options", params);
  const getUsers = (params) => apiClient.get("auth/users", params);
  return {
    getRoles,
    getPrivileges,
    addRoles,
    updateRole,
    getMenuOptions,
    getUsers,
    addPrivilege,
    updatePrivilege,
  };
};

export default useAuthorize;
