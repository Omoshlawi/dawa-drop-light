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
  const getPatients = (params) => apiClient.get("patients", params);
  const addTreatmentSurporter = (data) =>
    apiClient.post("auth/user/relations", data);
  const updateTreatmentSurporter = (relationId, data) =>
    apiClient.put(`auth/user/relations/${relationId}`, data);
  const searchTreatmentSurporter = (q) =>
    apiClient.get("auth/user/relations/search", { q });
  return {
    getPendingOrderRequests,
    createDelivery,
    getDeliveryHistory,
    updateDelivery,
    getDrugDispenseDetail,
    dispenseDrug,
    getPatients,
    addTreatmentSurporter,
    searchTreatmentSurporter,
    updateTreatmentSurporter,
  };
};

export default useProvidor;
