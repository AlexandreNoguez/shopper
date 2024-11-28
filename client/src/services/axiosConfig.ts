import axios from "axios";

const Api = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: "http://localhost:8080/api",
  // baseURL: "http://server:8080/api",
  timeout: 5000,
});

export default Api;
