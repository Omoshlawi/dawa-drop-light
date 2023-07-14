import { create } from "apisauce";
import { BASE_URL } from "../utils/contants";

// http://192.168.100.5:8000/properties/
// http://applemaster.co.ke:8000/
// http://192.168.100.5:8000/
// const apiClient = create({ baseURL: "http://192.168.100.5:5000/" });
const apiClient = create({ baseURL: BASE_URL });

export default apiClient;
