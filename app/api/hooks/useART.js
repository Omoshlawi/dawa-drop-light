import apiClient from "../client";

const useART = () => {
  const getARTModels = (params) => apiClient.get("art/models", params);
  const addARTModels = (data) => apiClient.post("art/models", data);
  const updateARTModels = (modelId, data) =>
    apiClient.put(`art/models/${modelId}`, data);
  const getARTModelDetail = (modelId) => apiClient.get(`art/models/${modelId}`);
  return { addARTModels, updateARTModels, getARTModelDetail, getARTModels };
};

export default useART;
