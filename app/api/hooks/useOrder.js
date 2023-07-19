import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const useOrder = () => {
  addTokenInterceptor();
  const getDeliveryModes = () => apiClient.get("deliveries/modes");
  const updateDeliveryMode = (deliveryId, data) =>
    apiClient.put(`deliveries/modes/${deliveryId}`, data);
  const addDeliveryMode = (data) => apiClient.post(`deliveries/modes`, data);

  return { getDeliveryModes, updateDeliveryMode, addDeliveryMode };
};

export default useOrder;
