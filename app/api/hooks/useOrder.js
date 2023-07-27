import apiClient from "../client";
import { addTokenInterceptor } from "../helpers";

const useOrder = () => {
  addTokenInterceptor();
  const getDeliveryModes = () => apiClient.get("deliveries/modes");
  const updateDeliveryMode = (deliveryId, data) =>
    apiClient.put(`deliveries/modes/${deliveryId}`, data);
  const addDeliveryMode = (data) => apiClient.post(`deliveries/modes`, data);
  const getDeliveryTimeSlots = () => apiClient.get("deliveries/timeslots");
  const addDeliveryTimeSlot = (data) =>
    apiClient.post("deliveries/timeslots", data);

  const updateDeliveryTimeSlot = (_id, data) =>
    apiClient.put(`deliveries/timeslots/${_id}`, data);
  const getDeliveryMethods = () => apiClient.get("deliveries/methods");
  const addDeliveryMethod = (data) =>
    apiClient.post("deliveries/methods", data);
  const updateDeliveryMethod = (_id, data) =>
    apiClient.put(`deliveries/methods/${_id}`, data);
  return {
    getDeliveryModes,
    updateDeliveryMode,
    addDeliveryMode,
    getDeliveryTimeSlots,
    addDeliveryTimeSlot,
    updateDeliveryTimeSlot,
    getDeliveryMethods,
    addDeliveryMethod,
    updateDeliveryMethod,
  };
};

export default useOrder;
