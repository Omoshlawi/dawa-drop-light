import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const usePatient = () => {
  addTokenInterceptor();
  const getAppointments = () => apiClient.get("patients/appointments");
  const getOrders = () => apiClient.get("patients/orders");
  const addOrder = (data) => apiClient.post("patients/orders", data);
  const updateOrder = (orderId, data) =>
    apiClient.put(`patients/orders/${orderId}`, data);
  return { getAppointments, getOrders, addOrder, updateOrder };
};

export default usePatient;
