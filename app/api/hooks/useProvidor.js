import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const useProvidor = () => {
  addTokenInterceptor();
  const getPendingOrderRequests = (params) => apiClient.get("orders/pending");
  const createDelivery = (data) => apiClient.post("deliveries", data);
  const updateDelivery = (deliveryId, data) =>
    apiClient.put(`deliveries/${deliveryId}`, data);
  const getDeliveryHistory = () => apiClient.get("deliveries/history");
  const getDrugDispenseDetail = (params) =>
    apiClient.get("orders/dispense", params);
  const dispenseDrug = (data) => apiClient.post("orders/dispense", data);
  return {
    getPendingOrderRequests,
    createDelivery,
    getDeliveryHistory,
    updateDelivery,
    getDrugDispenseDetail,
    dispenseDrug,
  };
};

export default useProvidor;
