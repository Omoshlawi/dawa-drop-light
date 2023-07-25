import apiClient from "../client";

const useGeoService = () => {
  const searchPlace = (params) => apiClient.get("maps/places", params);
  return { searchPlace };
};

export default useGeoService;
