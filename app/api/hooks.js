import { useUserContext } from "../context/hooks";
import apiClient from "./client";


const useAuthenticate = (data)=>apiClient.post()