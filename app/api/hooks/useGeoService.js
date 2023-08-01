import apiClient from "../client";

const useGeoService = () => {
  const searchPlace = (params) => apiClient.get("maps/places", params);
  const reverseGeoCode = (params) =>
    apiClient.get("maps/geocoding/reverse", params);
  const aproximateDistanceTime = (data) => apiClient.post("maps/matrix", data);
  const direction = (data)=>apiClient.post("maps/direction", data)
  return { searchPlace, reverseGeoCode, aproximateDistanceTime, direction };
};

export default useGeoService;
