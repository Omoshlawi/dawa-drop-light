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
  const checkoutDelivery = (data) =>
    apiClient.post("patients/delivery-feedback", data);
  const getDeliveries = (params) =>
    apiClient.get(`patients/deliveries/`, params);
  const addCareGiver = (data) =>
    apiClient.post("patients/ralations/add-care-giver", data);
  const updateCareGiver = (relation_id, data) =>
    apiClient.put(`patients/ralations/${relation_id}/update-care-giver`, data);
  const verifyPatientAndAddAsCareReceiver = (data) =>
    apiClient.post(`patients/ralations/verify-and-add-care-receiver`, data);
  const checkCareReceiverEligibility = (params) =>
    apiClient.get(`patients/relations/check-order-eligibility`, params);
  const orderForCareReceiver = (data) =>
    apiClient.post(`patients/relations/order`, data);
  const careReceiverOrders = (params) =>
    apiClient.get(`patients/relations/order`, params);

  return {
    getAppointments,
    getOrders,
    addOrder,
    updateOrder,
    checkEligibility,
    createProfile,
    verifySelf,
    getAppointment,
    getOrder,
    checkoutDelivery,
    getDeliveries,
    addCareGiver,
    updateCareGiver,
    verifyPatientAndAddAsCareReceiver,
    checkCareReceiverEligibility,
    orderForCareReceiver,
    careReceiverOrders,
  };
};

export default usePatient;
