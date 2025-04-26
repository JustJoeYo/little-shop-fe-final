import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const fetchData = (endpoint) => API.get(endpoint);
export const postData = (endpoint, data) => API.post(endpoint, data);
export const patchData = (endpoint, data) => API.patch(endpoint, data);
export const deleteData = (endpoint) => API.delete(endpoint);
