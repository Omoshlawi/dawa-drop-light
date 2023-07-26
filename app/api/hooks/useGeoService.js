import apiClient from "../client";

const useGeoService = () => {
  const searchPlace = (params) => apiClient.get("maps/places", params);
  const reverseGeoCode = (params) =>
    apiClient.get("maps/geocoding/reverse", params);
  return { searchPlace, reverseGeoCode };
};

export default useGeoService;
