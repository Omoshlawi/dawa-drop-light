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
  const getARTGroups = (params) =>
    apiClient.get("art/distribution-groups", params);
  const addARTGroup = (data) => apiClient.post("art/distribution-groups", data);
  const updateARTGroup = (modelId, data) =>
    apiClient.put(`art/distribution-groups/${modelId}`, data);
  const getARTGroupDetail = (modelId) =>
    apiClient.get(`art/distribution-groups/${modelId}`);
  return {
    addARTModels,
    updateARTModels,
    getARTModelDetail,
    getARTModels,
    getARTGroupLeadDetail,
    getARTGroupsLeads,
    updateARTGroupLead,
    addARTGroupLead,
    getARTGroups,
    getARTGroupDetail,
    updateARTGroup,
    addARTGroup,
  };
};

export default useART;
