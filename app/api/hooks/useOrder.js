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
  const tripAction = (deliveryId, action, data) =>
    apiClient.post(`deliveries/${deliveryId}/${action}`, data);
  const getDelivery = (deliveryId) => apiClient.get(`deliveries/${deliveryId}`);
  const getCourrierServices = (params) =>
    apiClient.get("deliveries/courrier-services", params);
  const addCourrierService = (data) =>
    apiClient.post("deliveries/courrier-services", data);
  const getCourrierServiceDetail = (serviceId) =>
    apiClient.get(`deliveries/courrier-services/${serviceId}`);
  const updateCourrierServiceDetail = (serviceId, data) =>
    apiClient.get(`deliveries/courrier-services/${serviceId}`, data);
  const addOrder = (data) => apiClient.post("orders", data);
  const updateOrder = (orderId, data) =>
    apiClient.put(`orders/${orderId}`, data);

  const initiateDelivery = (data) =>
    apiClient.post(`deliveries`, data);
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
    tripAction,
    getDelivery,
    getCourrierServiceDetail,
    getCourrierServices,
    updateCourrierServiceDetail,
    addCourrierService,
    addOrder,
    updateOrder,
    initiateDelivery
  };
};

export default useOrder;
