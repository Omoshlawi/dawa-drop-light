import apiClient from "../client";

const useProvidor = () => {
  const getPendingOrderRequests = (params) => apiClient.get("orders");
  const createDelivery = (data) => apiClient.post("deliveries", data);
  return { getPendingOrderRequests, createDelivery };
};

export default useProvidor;
