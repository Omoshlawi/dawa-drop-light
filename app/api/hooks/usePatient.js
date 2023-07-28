import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const usePatient = () => {
  addTokenInterceptor();
  const getAppointments = () => apiClient.get("patients/appointments");
  const getAppointment = (id) => apiClient.get(`patients/appointments/${id}`);
  const getOrders = () => apiClient.get("patients/orders");
  const getOrder = (orderId) => apiClient.get(`patients/orders/${orderId}`);
  const addOrder = (data) => apiClient.post("patients/orders", data);
  const updateOrder = (orderId, data) =>
    apiClient.put(`patients/orders/${orderId}`, data);
  const checkEligibility = () =>
    apiClient.get("patients/orders/check-eligibility");
  const createProfile = (data) =>
    apiClient.post("patients/create-profile", data);
  const verifySelf = (data) => apiClient.post("patients/verify", data);
  return {
    getAppointments,
    getOrders,
    addOrder,
    updateOrder,
    checkEligibility,
    createProfile,
    verifySelf,
    getAppointment,
    getOrder
  };
};

export default usePatient;
