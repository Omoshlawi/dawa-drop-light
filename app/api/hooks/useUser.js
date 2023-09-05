import { useSettinsContext, useUserContext } from "../../context/hooks";
import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";
import jwtDecode from "jwt-decode";

const useUser = () => {
  const { clearToken, token } = useUserContext();
  const { pin, disablePin } = useSettinsContext();
  addTokenInterceptor();
  const getUser = () => apiClient.get("auth/profile");
  const logout = () => {
    clearToken(true);
    disablePin(pin);
  };
  const changePassword = (data) => apiClient.post("auth/change-password", data);
  const updateProfile = (data) =>
    apiClient.post("auth/profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  const getMenuOptions = () => apiClient.get("/auth/my-menu-options");
  const getTreatmentSurport = (params) =>
    apiClient.get("auth/user/relations", params);
  const getTreatmentSurportDetail = (treatmentId) =>
    apiClient.get(`auth/user/relations/${treatmentId}`);
  const acceptTreatmentSurportInvite = (treatmentId) =>
    apiClient.get(`auth/user/relations/${treatmentId}/accept`);
  const getUserId = () => jwtDecode(token)._id;
  const searchUser = (params) => apiClient.get("auth/profile");

  return {
    getUser,
    logout,
    changePassword,
    updateProfile,
    getMenuOptions,
    getUserId,
    getTreatmentSurport,
    searchUser,
    getTreatmentSurportDetail,
    acceptTreatmentSurportInvite,
  };
};

export default useUser;
