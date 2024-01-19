import axios from "axios";
import { API_URL, CONTENT_TYPE_JSON } from "../constants/constants";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": CONTENT_TYPE_JSON,
  },
});

const authApiClient = (token) =>
  axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": CONTENT_TYPE_JSON,
      Authorization: `${token}`,
    },
  });

export default { apiClient, authApiClient };
