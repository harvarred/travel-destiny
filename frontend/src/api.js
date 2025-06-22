import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/home" });

export const getAllDestinations = () => API.get("/");
export const createDestination = (data) => API.post("/", data);
export const updateDestination = (id, data) => API.put(`/${id}`, data);
export const deleteDestination = (id) => API.delete(`/${id}`);

