import { useUserContext } from "../context/hooks";
import apiClient from "./client";

export const addTokenInterceptor = () => {
  const { token } = useUserContext();
  if (token) {
    apiClient.addRequestTransform((request) => {
      // Add the authentication token to the request header.
      request.headers["x-auth-token"] = token;
      return request;
    });
  }
};
