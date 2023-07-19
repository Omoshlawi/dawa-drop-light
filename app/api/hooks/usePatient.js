import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const usePatient = () => {
  addTokenInterceptor();
  const getAppointments = () => apiClient.get("patients/appointments");
  const getOrders = () => apiClient.get("patients/orders");
  return { getAppointments };
};

export default usePatient;
