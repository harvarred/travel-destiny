// src/api.js
import axios from "axios";

// ✅ Base API configuration
const API = axios.create({ baseURL: "http://localhost:3000/home" });

// ✅ Attach token to every request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ Destination CRUD
export const getAllDestinations = () => API.get("/");
export const createDestination = (data) => API.post("/", data);
export const updateDestination = (id, data) => API.put(`/${id}`, data);
export const deleteDestination = (id) => API.delete(`/${id}`);

// Reviews (updated to support siteName)
export const addReview = (destinationId, review) =>
  API.post(`/${destinationId}/reviews`, review);

export const getReviews = (destinationId, siteName) =>
  API.get(`/${destinationId}/reviews`, { params: { siteName } });

export const incrementViews = (id) => API.put(`/${id}/views`);

