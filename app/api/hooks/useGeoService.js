import apiClient from "../client";

const useGeoService = () => {
  const searchPlace = (params) => apiClient.get("maps/places", params);
  const reverseGeoCode = (params) =>
    apiClient.get("maps/geocoding/reverse", params);
  const aproximateDistanceTime = (data) => apiClient.post("maps/matrix", data);
  return { searchPlace, reverseGeoCode, aproximateDistanceTime };
};

export default useGeoService;
