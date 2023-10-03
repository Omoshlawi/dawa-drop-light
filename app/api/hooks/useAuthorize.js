import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const useAuthorize = () => {
  addTokenInterceptor();
  const registerUserPushNotificationToken = (data) => apiClient.post("auth/register-user-push-token", data)
  const getRoles = (params) => apiClient.get("auth/roles", params);
  const addRoles = (data) => apiClient.post("auth/roles", data);
  const addPrivilege = (data) => apiClient.post("auth/privileges", data);
  const addSmsConfig = (data) => apiClient.post("sms-config", data);
  const addMenuOption = (data) =>
    apiClient.post("auth/menu-options", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  const updateRole = (_id, data) => apiClient.put(`auth/roles/${_id}`, data);
  const asignUserRoles = (_id, data) =>
    apiClient.post(`auth/user/${_id}/asign-role`, data);
  const updatePrivilege = (_id, data) =>
    apiClient.put(`auth/privileges/${_id}`, data);
  const updateSmsConfig = (_id, data) =>
    apiClient.put(`sms-config/${_id}`, data);
  const updateMenuOption = (_id, data) =>
    apiClient.put(`auth/menu-options/${_id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  const getPrivileges = (params) => apiClient.get("auth/privileges", params);
  const getSmsConfigs = (params) => apiClient.get("sms-config", params);
  const getMenuOptions = (params) => apiClient.get("auth/menu-options", params);
  const getUsers = (params) => apiClient.get("auth/users", params);
  const getUserAuthInfo = (userId) => apiClient.get(`auth/user/${userId}`);

  return {
    getRoles,
    getPrivileges,
    addRoles,
    updateRole,
    getMenuOptions,
    getUsers,
    addPrivilege,
    updatePrivilege,
    updateMenuOption,
    addMenuOption,
    asignUserRoles,
    getUserAuthInfo,
    addSmsConfig,
    updateSmsConfig,
    getSmsConfigs,
    registerUserPushNotificationToken
  };
};

export default useAuthorize;
