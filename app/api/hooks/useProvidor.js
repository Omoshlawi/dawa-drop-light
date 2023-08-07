import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const useProvidor = () => {
  addTokenInterceptor();
  const getPendingOrderRequests = (params) => apiClient.get("orders/pending");
  const createDelivery = (data) => apiClient.post("deliveries", data);
  const getDeliveryHistory = () => apiClient.get("deliveries/history");
  return { getPendingOrderRequests, createDelivery, getDeliveryHistory };
};

export default useProvidor;
