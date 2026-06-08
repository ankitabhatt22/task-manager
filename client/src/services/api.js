import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-api-i3rn.onrender.com/api",
});

export default api;