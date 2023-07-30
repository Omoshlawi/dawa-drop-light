import apiClient from "../client";

const useProvidor = () => {
  const getPendingOrderRequests = (params) => apiClient.get("orders");
  return { getPendingOrderRequests };
};

export default useProvidor;
