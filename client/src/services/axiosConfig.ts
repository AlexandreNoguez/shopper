import axios from "axios";

const Api = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

export default Api;
