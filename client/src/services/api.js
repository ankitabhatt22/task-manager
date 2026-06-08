import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-api-13rn.onrender.com/",
});

export default api;