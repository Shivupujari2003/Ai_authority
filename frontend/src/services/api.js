import axios from "axios";

// Use the environment variable if available, otherwise default to localhost
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
