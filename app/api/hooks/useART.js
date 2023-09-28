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
  const addARTGroupMember = (groupId, data) =>
    apiClient.post(`art/distribution-groups/${groupId}/add-member`, data);
  const updateARTGroup = (modelId, data) =>
    apiClient.put(`art/distribution-groups/${modelId}`, data);
  const getARTGroupDetail = (modelId) =>
    apiClient.get(`art/distribution-groups/${modelId}`);

  const getDistrubutionEvents = (params) =>
    apiClient.get("art/distribution-events", params);
  const confirmDistributionEventAttendance = (eventId) =>
    apiClient.get(`art/distribution-events/${eventId}/confirm-attendance`);
  const addDistributionEvent = (data) =>
    apiClient.post("art/distribution-events", data);
  
  const updateDistributionEvent = (modelId, data) =>
    apiClient.put(`art/distribution-events/${modelId}`, data);
  const getDistributionDetail = (modelId) =>
    apiClient.get(`art/distribution-events/${modelId}`);
  const changeIdentityInGroup = (enrolmentId, data) =>
    apiClient.post(`art/group-enrollment/${enrolmentId}/change-name`, data);
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
    addARTGroupMember,
    getDistrubutionEvents,
    getDistributionDetail,
    addDistributionEvent,
    updateDistributionEvent,
    confirmDistributionEventAttendance,
    changeIdentityInGroup,
  };
};

export default useART;
