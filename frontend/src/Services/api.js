import axios from "axios";

const api = axios.create({
  baseURL: "https://evox.onrender.com/",
});

export default api;
