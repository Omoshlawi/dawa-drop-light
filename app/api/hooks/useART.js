import apiClient from "../client";

const useART = () => {
  const getARTModels = (params) => apiClient.get("art/models", params);
  const addARTModels = (data) => apiClient.post("art/models", data);
  const updateARTModels = (modelId, data) =>
    apiClient.put(`art/models/${modelId}`, data);
  const getARTModelDetail = (modelId) => apiClient.get(`art/models/${modelId}`);
  const getARTGroupsLeads = (params) =>
    apiClient.get("art/group-leads", params);
  const addARTGroupLead = (data) => apiClient.post("art/group-leads", data);
  const updateARTGroupLead = (modelId, data) =>
    apiClient.put(`art/group-leads/${modelId}`, data);
  const getARTGroupLeadDetail = (modelId) =>
    apiClient.get(`art/group-leads/${modelId}`);
  return {
    addARTModels,
    updateARTModels,
    getARTModelDetail,
    getARTModels,
    getARTGroupLeadDetail,
    getARTGroupsLeads,
    updateARTGroupLead,
    addARTGroupLead,
  };
};

export default useART;
